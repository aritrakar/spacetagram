import React, { Fragment } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "../assets/icons";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./Navbar.css";

export default function Navbar() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  // const [sd, setSD] = useState(props.tempStartDate);
  // const [ed, setED] = useState(props.tempEndDate);
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
      <header className="sticky top-0 z-20 border-b bg-slate-100 dark:bg-[#00142e] dark:border-none">
        <div
          className="flex items-center justify-between h-16 px-4 
          mx-auto max-w-screen-2xl sm:px-6 lg:px-8"
        >
          <div className="flex items-center ml-14">
            <Link to="/" className="flex flex-shrink-0 mr-2">
              <span className="text-black dark:text-white inline-block w-content px-4 h-10 font-raleway font-bold text-xl">
                <h1 className="mt-1.5">Spacetagram</h1>
              </span>
            </Link>
            <nav
              className="text-black dark:text-white items-center font-lightfont hidden pl-8 ml-8 space-x-8 
              text-sm font-medium border-l border-gray-100 md:flex"
            >
              <a
                href="https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE"
                target="_blank"
                rel="noopener noreferrer"
              >
                Challenge
              </a>

              <a
                href="https://github.com/aritrakar/spacetagram/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>

              <a
                href="https://github.com/aritrakar/spacetagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </nav>
          </div>
          {/* <div className="flex items-center">
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
          </div> */}

          {theme === "light" ? (
            <div
              className="py-2 px-2 bg-gray-100 dark:bg-gray-50 rounded-2xl hover:cursor-pointer 
              dark:bg-transparent "
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <MoonIcon />
            </div>
          ) : (
            <div
              className="py-2 px-2 bg-gray-100 rounded-2xl  hover:cursor-pointer dark:bg-yellow-300"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon />
            </div>
          )}
        </div>
      </header>
    </Fragment>
  );
}
