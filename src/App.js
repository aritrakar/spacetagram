import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import rocket from "./rocket-in-space.gif";

function App() {
  const addDays = (current, days) => {
    let date = new Date(current.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const datediff = (date1, date2) => {
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  };

  // const getDates = (date1, date2) => {
  //   let dateArray = [];
  //   let currentDate = date1;
  //   while (currentDate <= date2) {
  //     dateArray.push(new Date(currentDate));
  //     currentDate = addDays(currentDate, 1);
  //   }
  //   return dateArray;
  // };

  let formatDate = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endDate = new Date();
  // let startDate = new Date(2022, 0, 1); // 1995, 05, 16, since the first date was 1995-6-16
  let startDate = addDays(endDate, -15);

  const NASA_API_KEY = "QYgfysWjc56CwbYsfwA7Hofgddo2NqFVfyAIwsVS";
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [likes, setLikes] = useState([]);

  const fetchData = async () => {
    let response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(endDate)}`
    );
    response = await response.json();
    response = await response.reverse();
    setContents(response);
    setLoading(false);
  };

  useEffect(() => {
    async function getContents() {
      if (!localStorage.getItem("startDate")) {
        localStorage.setItem("startDate", { startDate });
      } else {
        console.log("FOUND. startDate: ", startDate);
      }

      // if (!localStorage.getItem("contents")) {
      //   await fetchData();
      //   localStorage.setItem("contents", JSON.stringify(contents));
      // } else {
      //   let data = JSON.parse(localStorage.getItem("contents"));
      //   console.log("datediff: ", datediff(startDate, endDate));
      //   console.log("contents.length: ", contents?.length);
      //   if (contents?.length !== data?.length) await fetchData();
      //   setContents(data);
      //   setLoading(false);
      //   console.log("FOUND. contents: ");
      // }

      // let response = await fetch(
      //   `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=15`
      // );

      await fetchData();

      // console.log(addDays(endDate, -5));
      // console.log(`endDate: ${endDate}`);
      // console.log(formatDate(endDate));
      // console.log(`startDate: ${startDate}`);
      // console.log(formatDate(startDate));
      // console.log(getDates(startDate, endDate));
    }

    getContents();
  }, []);

  return (
    <div className="App ">
      <h1 className="text-4xl font-raleway font-bold m-4">Spacetagram</h1>
      <div className="max-w-sm flex justify-center items-center bg-red-600">
        {loading && (
          <img
            className="max-w-sm flex justify-center items-center bg-red-600"
            src={rocket}
            alt="Loading"
          />
        )}
      </div>
      <div className="flex flex-wrap max-w-100 justify-center">
        {contents?.map((picture, key) => {
          return (
            <Card
              key={key}
              title={picture?.title}
              date={picture?.date}
              body={picture?.explanation}
              image={picture?.hdurl}
            />
          );
        })}
      </div>
    </div>
  );

  // return (
  //   <div className="App ">
  //     <h1 className="text-4xl font-sans font-bold m-4">Spacetagram</h1>
  //     <div className="max-w-sm flex justify-center items-center bg-red-600">
  //       {loading && (
  //         <img
  //           // className="max-w-sm content-center items-center bg-red-600"
  //           className="max-w-sm flex justify-center items-center bg-red-600"
  //           src={rocket}
  //           alt="Loading"
  //         />
  //       )}
  //     </div>
  //     <div className="flex flex-wrap max-w-100 justify-center">
  //       {contents?.map((picture) => {
  //         return (
  //           <Card
  //             title={picture?.title}
  //             date={picture?.date}
  //             body={picture?.explanation}
  //             image={picture?.hdurl}
  //           />
  //         );
  //       })}

  //       <InfiniteScroll
  //         dataLength={contents.length} //This is important field to render the next data
  //         next={fetchData}
  //         hasMore={true}
  //         loader={<h4>Loading...</h4>}
  //         endMessage={
  //           <p style={{ textAlign: "center" }}>
  //             <b>Yay! You have seen it all</b>
  //           </p>
  //         }
  //         // below props only if you need pull down functionality
  //         refreshFunction={this.refresh}
  //         pullDownToRefresh
  //         pullDownToRefreshThreshold={50}
  //         pullDownToRefreshContent={
  //           <h3 style={{ textAlign: "center" }}>
  //             &#8595; Pull down to refresh
  //           </h3>
  //         }
  //         releaseToRefreshContent={
  //           <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
  //         }
  //       >
  //         {contents}
  //       </InfiniteScroll>
  //     </div>
  //   </div>
  // );
}

export default App;
