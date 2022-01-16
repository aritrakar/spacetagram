import { CalendarIcon, HeartIcon } from "../assets/icons";

export default function Navbar() {
  return (
    <>
      <header className="border-b border-gray-100">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <a href="/" className="flex flex-shrink-0 mr-2">
              <span className="inline-block w-content px-4 h-10  font-sans font-bold bg-gray-200 rounded-lg">
                <h1 className="mt-1.5">Spacetagram</h1>
              </span>
            </a>
            <nav className="items-center font-lightfont hidden pl-8 ml-8 space-x-8 text-sm font-medium border-l border-gray-100 md:flex">
              <a href="/">Home</a>
              <a href="https://github.com/aritrakar/spacetagram">Github</a>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="items-center hidden divide-x font-lightfont divide-gray-100 lg:flex">
              <a href className="block px-6 text-center">
                <HeartIcon
                  fill={"none"}
                  stroke={"currentColor"}
                  className="h-5 w-5 ml-1 mr-1"
                />
                <span className="block mt-1  text-xs font-medium">Liked</span>
              </a>
              <a href className="block px-6 text-center">
                <CalendarIcon className="h-5 w-5 ml-1 mr-1" />
                <span className="block mt-1 text-xs font-medium">Date</span>
              </a>
            </div>

            <button
              type="button"
              className="inline-flex flex-col items-center justify-center w-16 h-16 bg-gray-100 border-l border-white lg:hidden"
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
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
