import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
// import { CalendarIcon } from "../assets/icons";
// import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';
import DateRangePicker from "@themesberg/tailwind-datepicker/DateRangePicker";

export default function Navbar(props) {
  const dateRangePicker = useRef();
  //let drp = new DateRangePicker(dateRangePicker, {});
  const dateRangePickerEl = document.getElementById("dateRangePickerId");
  let drp;
  if (dateRangePickerEl) {
    drp = new DateRangePicker(dateRangePickerEl, {});
    console.log("BRUH 1: ", drp.inputs[0]?.value);
    console.log("BRUH 2: ", drp.inputs[1]?.value);
  }

  return (
    <Fragment>
      <header className="border-b border-gray-100">
        <div
          className="flex items-center justify-between h-16 px-4 
          mx-auto max-w-screen-2xl sm:px-6 lg:px-8"
        >
          <div className="flex items-center">
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
            {/* <div
              className="items-center hidden divide-x font-lightfont
             divide-gray-100 lg:flex"
            >
              <Link to="/" className="block px-6 text-center">
                <CalendarIcon className="h-5 w-5 ml-1 mr-1" />
                <span className="block mt-1 text-xs font-medium">Date</span>
              </Link>
            </div> */}
            {/* <button
              type="button"
              className="inline-flex flex-col items-center justify-center
              w-16 h-16 bg-gray-100 border-l border-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button> */}

            <div
              //date-rangepicker="true"
              className="flex items-center"
              ref={dateRangePicker}
              id="dateRangePickerId"
            >
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2
                      0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  name="start"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 
                  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                  placeholder="Select date start"
                  onChange={(event) => {
                    console.log("Start date: ", event);
                    // props.setStartDate();
                  }}
                />
              </div>

              <span className="mx-4 text-gray-500">to</span>

              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 
                      00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  name="end"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                  placeholder="Select date end"
                  onChange={(event) => {
                    console.log("End date: ", event);
                    //props.setEndDate();
                  }}
                />
              </div>
            </div>

            {/* <div  className="flex items-center mr-40">
              <div className="relative w-20 rounded-lg">
                <DatePicker
                  selected={props.startDate}
                  onChange={(date) => {
                    console.log(date);
                    props.setStartDate(date);
                  }}
                  selectsStart
                  startDate={props.startDate}
                  endDate={props.endDate}
                  nextMonthButtonLabel=">"
                  previousMonthButtonLabel="<"
                  popperClassName="react-datepicker-left"
                />
              </div>

              <span className="mx-4 text-gray-500">to</span>

              <div className="relative w-20">
                <DatePicker
                  selected={props.endDate}
                  onChange={(date) => {
                    console.log(date);
                    props.setEndDate(date);
                  }}
                  selectsEnd
                  startDate={props.startDate}
                  endDate={props.endDate}
                  nextMonthButtonLabel=">"
                  previousMonthButtonLabel="<"
                  popperClassName="react-datepicker-right"
                />
              </div>
            </div> */}
          </div>
        </div>
      </header>
    </Fragment>
  );
}
