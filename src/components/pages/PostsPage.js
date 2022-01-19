import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Card from "../Card";
import Navbar from "../Navbar";
import Hero from "../Hero";
import { addDays, datediff, formatDate } from "../sharedFunctions";
import rocket_loader from "../../assets/rocket-loader.gif";

export default function PostsPage() {
  const newPosts = 15;
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numPosts, setNumPosts] = useState(newPosts); // Fetch 15 posts by default
  const loader = useRef(null); // To facilitate infinite scrolling

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
        if (numPosts + 15 < days) setNumPosts((posts) => posts + newPosts);
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
      setContents(response);
      setLoading(false);
      return response;
    }
  });

  useEffect(() => {
    fetchData();
  }, [numPosts]); // Putting any more dependencies make it update repeatedly

  /**
   * The Intersection Observer is set to observe the last post.
   * When it comes into the browser's viewport, this triggers,
   * thus loading more posts to give the "infinite scrolling" effect.
   */
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    let observer = new IntersectionObserver(loadMore, options);

    // Observer the loader (last post)
    const current = loader.current;
    if (loader && loader.current) {
      // console.log("OBSERVING: ", loader.current);
      observer.observe(loader.current);
    }

    // Clean up
    return () => {
      if (current) {
        // console.log("UNOBSERVING: ", current);
        observer.unobserve(current);
      }
    };
  }, [loader, loadMore]);

  return (
    <div className="text-center bg-white dark:bg-[#0c213d]">
      <Navbar
        tempStartDate={tempStartDate}
        tempEndDate={tempEndDate}
        handleDateChange={handleDateChange}
      />

      <div className="flex flex-wrap max-w-100 justify-center ">
        <Hero />

        {contents?.map((picture, key) => {
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
    </div>
  );
}
