import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Card from "../Card";
import Navbar from "../Navbar";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  let { date } = useParams();
  date = new Date(date);

  const addDays = (current, days) => {
    let date = new Date(current.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  date = addDays(date, 1);
  // console.log("Date to fetch: ", date);

  let formatDate = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    async function getData() {
      let response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${
          process.env.REACT_APP_NASA_API_KEY
        }&date=${formatDate(date)}`,
        { mode: "cors", headers: { SameSite: "None" } } // new
      );
      response = response.json();
      return response;
    }

    getData().then((res) => {
      // console.log("POST:", res);
      setPost(res);
    });
  }, []);

  return (
    <>
      <Navbar />
      <center>
        <div className="lg:mt-20">
          <Card
            key={date}
            title={post?.title}
            date={post?.date}
            body={post?.explanation}
            image={post?.hdurl ? post?.hdurl : post?.url}
            media_type={post?.media_type || "image"}
          />
        </div>
      </center>
    </>
  );
}
