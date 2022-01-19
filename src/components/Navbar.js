import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Navbar.css";

export default function Navbar(props) {
  const [sd, setSD] = useState(props.tempStartDate);
  const [ed, setED] = useState(props.tempEndDate);

  // const dateRangePicker = useRef();
  // //let drp = new DateRangePicker(dateRangePicker, {});
  // const dateRangePickerEl = document.getElementById("dateRangePickerId");
  // let drp;
  // if (dateRangePickerEl) {
  //   drp = new DateRangePicker(dateRangePickerEl, {});
  //   console.log("Date 1: ", drp.inputs[0]?.value);
  //   console.log("Date 2: ", drp.inputs[1]?.value);
  // }

  return (
    <Fragment>
      <header className="border-b border-gray-100">
        <div
          className="flex items-center justify-between h-16 px-4 
          mx-auto max-w-screen-2xl sm:px-6 lg:px-8"
        >
          <div className="flex items-center ml-14">
            <Link to="/" className="flex flex-shrink-0 mr-2">
              <span className="inline-block w-content px-4 h-10 font-raleway font-bold text-xl">
                <h1 className="mt-1.5">Spacetagram</h1>
              </span>
            </Link>
            <nav
              className="items-center font-lightfont hidden pl-8 ml-8 space-x-8 
              text-sm font-medium border-l border-gray-100 md:flex"
            >
              <Link
                to="https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </Link>
              <Link
                to="https://github.com/aritrakar/spacetagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-6 w-84">
              <div className="relative w-auto">
                <DatePicker
                  wrapperClassName="datePicker"
                  selected={sd}
                  onChange={(date) => {
                    console.log("BRUH: ", date);
                    props.handleDateChange(date, true);
                    setSD(date);
                  }}
                />
              </div>

              <span className="mx-[-2rem] text-gray-500">to</span>

              <div className="relative w-auto">
                <DatePicker
                  wrapperClassName="datePicker"
                  selected={ed}
                  onChange={(date) => {
                    console.log("BRUH: ", date);
                    props.handleDateChange(date, false);
                    setED(date);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
}
