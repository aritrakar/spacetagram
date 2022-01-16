import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Card from "../Card";
import Navbar from "../Navbar";

export default function SinglePost(props) {
  const [post, setPost] = useState(null);
  let { date } = useParams();
  console.log(date);
  date = new Date(date);

  const addDays = (current, days) => {
    let date = new Date(current.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  date = addDays(date, 1);
  console.log("2: ", date);

  let formatDate = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //let date = new Date(props.match.params?.date);

  useEffect(() => {
    async function getData() {
      let response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=QYgfysWjc56CwbYsfwA7Hofgddo2NqFVfyAIwsVS&date=${formatDate(
          date
        )}`
      );
      response = response.json();
      return response;
    }

    getData().then((res) => {
      console.log("POST:", res);
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
            image={post?.hdurl}
          />
        </div>
      </center>
    </>
  );
}
