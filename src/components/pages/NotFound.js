import React from "react";
import { Navbar } from "..";
import NotFoundGif from "../../assets/NotFound.gif";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <center>
        <div className="mt-10">
          <img src={NotFoundGif} alt="not found" />
        </div>

        <h1 className="lg:text-3xl text-2xl font-sans font-bold mt-10 mr-0 ml-2">
          Sorry, but that route could not be found.
        </h1>
      </center>
    </>
  );
}
