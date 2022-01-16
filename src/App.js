// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import "./App.css";
// import Card from "./components/Card";
// import rocket from "./rocket-in-space.gif";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PostsPage from "./components/pages/PostsPage";
import SinglePost from "./components/pages/SinglePost";
import Navbar from "./components/Navbar";
import NotFoundGif from "./assets/NotFound.gif";

function App() {
  // const addDays = (current, days) => {
  //   let date = new Date(current.valueOf());
  //   date.setDate(date.getDate() + days);
  //   return date;
  // };

  // const datediff = (date1, date2) => {
  //   return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  // };

  // let formatDate = (date) => {
  //   let year = date.getFullYear();
  //   let month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   let day = date.getDate().toString().padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  // const NASA_API_KEY = "QYgfysWjc56CwbYsfwA7Hofgddo2NqFVfyAIwsVS";
  // const [contents, setContents] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [numPosts, setNumPosts] = useState(15);
  // const loader = useRef(null);

  // const firstDate = useMemo(() => new Date(1995, 5, 16), []); // since the first date was 1995-6-16
  // const endDate = useMemo(() => new Date(), []);
  // const days = datediff(firstDate, endDate);
  // let startDate = addDays(endDate, -numPosts);

  // // const fetchData = async (start, end) => {
  // //   if (start <= end && start >= firstDate) {
  // //     let response = await fetch(
  // //       `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${formatDate(
  // //         start
  // //       )}&end_date=${formatDate(end)}`
  // //     );
  // //     response = await response.json();
  // //     response = await response.reverse();
  // //     setContents(response);
  // //     setLoading(false);
  // //   }
  // // };

  // const loadMore = useCallback(
  //   (entries) => {
  //     const first = entries[0];
  //     if (first.isIntersecting && startDate >= firstDate) {
  //       console.log("Intersecting");
  //       if (numPosts + 15 < days) setNumPosts((posts) => posts + 15);
  //       else setNumPosts((posts) => posts + days);
  //     }
  //   },
  //   //[days, firstDate, numPosts, startDate]
  //   [numPosts, startDate]
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (startDate <= endDate && startDate >= firstDate) {
  //       setLoading(true);
  //       let response = await fetch(
  //         `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${formatDate(
  //           startDate
  //         )}&end_date=${formatDate(endDate)}`
  //       );
  //       response = await response.json();
  //       response = await response.reverse();
  //       setContents(response);
  //       setLoading(false);
  //       console.log(`startDate: ${startDate}`);
  //       console.log(datediff(firstDate, endDate));
  //       console.log(numPosts);
  //     }
  //   };

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
  // }, [numPosts]); // putting any more dependencies make it update repeatedly, fault of startDate

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1.0,
  //   };

  //   let observer = new IntersectionObserver(loadMore, options);

  //   // Observer the loader
  //   const current = loader.current;
  //   if (loader && loader.current) {
  //     console.log("OBSERVING: ", loader.current);
  //     observer.observe(loader.current);
  //   }

  //   // Clean up
  //   return () => {
  //     if (current) {
  //       console.log("UNOBSERVING: ", current);
  //       observer.unobserve(current);
  //     }
  //   };
  // }, [loader, loadMore]);

  // return (
  //   <div className="App ">
  //     <h1 className="text-4xl font-raleway font-bold m-4">Spacetagram</h1>
  //     <div className="flex flex-wrap max-w-100 justify-center">
  //       {contents?.map((picture, key) => {
  //         return key === numPosts ? (
  //           <div ref={loader} key={key}>
  //             <Card
  //               key={key}
  //               title={picture?.title}
  //               date={picture?.date}
  //               body={picture?.explanation}
  //               image={picture?.hdurl}
  //             />
  //           </div>
  //         ) : (
  //           <Card
  //             key={key}
  //             title={picture?.title}
  //             date={picture?.date}
  //             body={picture?.explanation}
  //             image={picture?.hdurl}
  //           />
  //         );
  //       })}
  //     </div>

  //     <center>
  //       <div className="max-w-sm flex justify-center items-center">
  //         {loading && (
  //           <img
  //             className="max-w-sm flex justify-center items-cente"
  //             src={rocket}
  //             alt="Loading..."
  //           />
  //         )}
  //       </div>
  //     </center>
  //   </div>
  // );

  const NotFound = () => {
    return (
      <>
        <Navbar />
        <center>
          {
            <div className="mt-10">
              {/* <Lottie options={defaultOptions} height={350} width={350} /> */}
              <img src={NotFoundGif} alt="not found" />
            </div>
          }

          <h1 className="lg:text-3xl text-2xl font-sans font-bold mt-10 mr-0 ml-2">
            Sorry, but that route could not be found.
          </h1>
        </center>
      </>
    );
  };

  return (
    <Router>
      <div className="App ">
        <Routes>
          <Route exact path="/" element={<PostsPage />} />
          <Route exact path="/posts/:date" element={<SinglePost />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
