/**
 * The following is a suboptimal, partially working attempt to
 * speed up the application using caching through react-query.
 * The infinite scrolling feature works, but with a large drawback.
 * For some reason it takes a long time for the posts to be updated
 * and displayed even though they are fetched quickly.
 * However, the benefit of caching is observed when switching pages -
 * cached data means that the posts aren't re-fetched, which saves time.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Card from "../Card";
import Navbar from "../Navbar";
import Hero from "../Hero";
import rocket_loader from "../../assets/rocket-loader.gif";
import { useInfiniteQuery } from "react-query";

function PostsPage() {
  /**
   *
   * @param {Date} current
   * @param {Number} days
   * @returns current + days
   */
  const addDays = (current, days) => {
    let date = new Date(current.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  /**
   *
   * @param {Date} date1
   * @param {Date} date2
   * @returns The difference in days between date1 and date2.
   */
  const datediff = (date1, date2) => {
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  };

  /**
   *
   * @param {Date} date Formats the date.
   * @returns Date formatted as YYYY-MM-DD with strings padded with 0s when required.
   */
  let formatDate = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numPosts, setNumPosts] = useState(15);
  const loader = useRef(null);

  const firstDate = useMemo(() => new Date(1995, 5, 16), []); // since the first date was 1995-6-16
  let endDate = useMemo(() => new Date(), []);
  let startDate = addDays(endDate, -numPosts);

  let tempStartDate = startDate;
  let tempEndDate = endDate;

  /**
   *
   * @param {Date} date The date to be assigned.
   * @param {Boolean} start The date to which to assign a new value.
   */
  const handleDateChange = (date, start = false) => {
    if (start) {
      tempStartDate = date;
    } else {
      tempEndDate = date;
    }
    // console.log("tempStartDate: ", tempStartDate);
    // console.log("tempEndDate: ", tempEndDate);
  };

  const days = datediff(firstDate, endDate);

  /**
   * Updates numPosts by 15 which then triggers a state update,
   * which loads more posts to support infinite scrolling.
   */
  const loadMore = useCallback(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting && startDate >= firstDate) {
        // console.log("Intersecting");
        if (numPosts + 15 < days) setNumPosts((posts) => posts + 15);
        else setNumPosts((posts) => posts + days);
      }
    },
    [days, firstDate, numPosts, startDate]
  );

  /**
   * Fetches post data between startDate and endDate.
   */
  const fetchData = useCallback(async () => {
    if (startDate <= endDate && startDate >= firstDate) {
      setLoading(true);
      /*
        1. startDate < firstDate: set startDate to firstDate
        2. endDate > Today's date: set endDate to today's date
        3. startDate < tempStartDate && tempEndDate < endDate
        4. firstDate <= tempStartDate < startDate  && tempEndDate <= endDate
        5. endDate < startDate: set endDate to startDate
      */
      let response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${
          process.env.REACT_APP_NASA_API_KEY
        }&start_date=${formatDate(tempStartDate)}&end_date=${formatDate(
          tempEndDate
        )}`,
        { mode: "cors", headers: { SameSite: "None" } }
      );
      response = await response.json();
      response = await response.reverse();
      // setContents(response);
      setLoading(false);
      return response;
    }
  });

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
  } = useInfiniteQuery("apodData", fetchData, undefined);

  /**
   * The following was a first attempt to achieve similar results
   * of caching, but using localStorage instead of react-query.
   */
  // useEffect(() => {
  //   // async function getContents() {
  //   //   // if (!localStorage.getItem("startDate")) {
  //   //   //   localStorage.setItem("startDate", { startDate });
  //   //   // } else {
  //   //   //   console.log("FOUND. startDate: ", startDate);
  //   //   // }
  //   //   // if (!localStorage.getItem("contents")) {
  //   //   //   await fetchData(startDate, endDate);
  //   //   //   localStorage.setItem("contents", JSON.stringify(contents));
  //   //   // } else {
  //   //   //   let data = JSON.parse(localStorage.getItem("contents"));
  //   //   //   console.log("datediff: ", datediff(startDate, endDate));
  //   //   //   console.log("contents.length: ", contents?.length);
  //   //   //   if (contents?.length !== data?.length) await fetchData(startDate, endDate);
  //   //   //   setContents(data);
  //   //   //   setLoading(false);
  //   //   //   console.log("FOUND. contents: ");
  //   //   // }
  //   //   await fetchData(startDate, endDate);
  //   //   // console.log(`startDate: ${startDate}`);
  //   //   // console.log(datediff(firstDate, endDate));
  //   //   // console.log(numPosts);
  //   // }
  //   // getContents();

  //   fetchData();
  //   console.log("Fetching");
  // }, [numPosts]); // putting any more dependencies make it update repeatedly

  /**
   * The Intersection Observer is set to observe the last post.
   * When it comes into the browser's viewport, this triggers,
   * thus loading more posts to give the "infinite scrolling" effect.
   */
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    let observer = new IntersectionObserver(loadMore, options);
    // let observer = new IntersectionObserver(fetchNextPage, options);

    // Observer the loader
    const current = loader.current;
    if (loader && loader.current) {
      console.log("OBSERVING: ", loader.current);
      observer.observe(loader.current);
    }

    // Clean up
    return () => {
      if (current) {
        console.log("UNOBSERVING: ", current);
        observer.unobserve(current);
      }
    };
  }, [loader, loadMore]);

  console.log(data);

  return (
    <div className="text-center">
      <Navbar
        tempStartDate={tempStartDate}
        tempEndDate={tempEndDate}
        handleDateChange={handleDateChange}
      />

      <div className="flex flex-wrap max-w-100 justify-center">
        <Hero />

        {data?.pages[0]?.map((picture, key) => {
          return key === numPosts ? (
            <div ref={loader} key={key}>
              <Card
                key={key}
                title={picture?.title || "Title"}
                date={picture?.date || "YYYY-MM-DD"}
                body={picture?.explanation || "Description"}
                image={picture?.hdurl ? picture?.hdurl : picture?.url}
                media_type={picture?.media_type || "image"}
              />
            </div>
          ) : (
            <Card
              key={key}
              title={picture?.title || "Title"}
              date={picture?.date || "YYYY-MM-DD"}
              body={picture?.explanation || "Description"}
              image={picture?.hdurl ? picture?.hdurl : picture?.url}
              media_type={picture?.media_type || "image"}
            />
          );
        })}
      </div>

      {(status === "loading" ||
        isFetching ||
        isFetchingNextPage ||
        isFetchingPreviousPage) && (
        <center>
          <div className="max-w-sm flex justify-center items-center">
            {loading && (
              <img
                className="max-w-sm flex justify-center items-cente"
                src={rocket_loader}
                alt="Loading..."
              />
            )}
          </div>
        </center>
      )}
    </div>
  );
}

export default PostsPage;
