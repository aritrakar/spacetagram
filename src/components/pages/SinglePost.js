import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import Card from "../Card";
import Navbar from "../Navbar";
import { addDays, formatDate } from "../sharedFunctions";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  let { date } = useParams();
  date = new Date(date);
  date = addDays(date, 1);

  /**
   * Fetches the data for a post from a certain date.
   * This feature was implemented this way in order to
   * create shareable links.
   */
  useEffect(() => {
    async function getData() {
      let response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${
          process.env.REACT_APP_NASA_API_KEY
        }&date=${formatDate(date)}`,
        { mode: "cors", headers: { SameSite: "None" } }
      );
      response = response.json();
      return response;
    }

    getData().then((res) => {
      // console.log("POST:", res);
      setPost(res);
    });
  }, []); // Empty dependency array prevents it from triggerring unnecessarily

  return (
    <Fragment>
      <Navbar />
      <center>
        <div className="lg:mt-20">
          <Card
            key={date}
            title={post?.title || "Title"}
            date={post?.date || ""}
            body={post?.explanation || "Explanation"}
            image={post?.hdurl ? post?.hdurl : post?.url}
            media_type={post?.media_type || "image"}
          />
        </div>
      </center>
    </Fragment>
  );
}
