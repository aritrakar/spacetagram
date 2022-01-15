import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import rocket from "./rocket-in-space.gif";

function App() {
  // let startDate, endDate;

  const NASA_API_KEY = "QYgfysWjc56CwbYsfwA7Hofgddo2NqFVfyAIwsVS";
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getContents() {
      let response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=15`
      );
      response = await response.json();
      setContents(response);
      setLoading(false);
    }

    getContents();
  }, []);

  return (
    <div className="App ">
      <h1 className="text-4xl font-sans font-bold m-4">Spacetagram</h1>
      <div className="max-w-sm flex justify-center items-center bg-red-600">
        {loading && (
          <img
            // className="max-w-sm content-center items-center bg-red-600"
            className="max-w-sm flex justify-center items-center bg-red-600"
            src={rocket}
            alt="Loading"
          />
        )}
      </div>
      <div className="flex flex-wrap max-w-100 justify-center">
        {contents?.map((picture) => {
          return (
            <Card
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
}

export default App;
