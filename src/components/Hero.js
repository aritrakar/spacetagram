export default function Hero() {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-24 mt-5 mx-auto sm:px-6 lg:px-8 mr-2">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-2xl from-red-500 via-blue-600 dark:via-amber-300 to-purple-600 bg-clip-text 
            font-extrabold font-raleway text-transparent sm:text-5xl bg-gradient-to-r not-sr-only"
          >
            Capturing the <br /> beauty of space
          </h1>
          <br />
          <p className="text-black dark:text-white font-sans mx-auto mt-6 text-lg max-w-xl not-sr-only">
            Spacetagram is brought to you by
            <div className="text-indigo-500 dark:text-orange-300">
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA's Astronomy <br />
                Picture of the Day API
              </a>
            </div>
          </p>

          {/* <center>
            <Link
              to="https://github.com/aritrakar/spacetagram"
              target="_blank"
              rel="noreferrer noopener"
              className="flex justify-center mt-8 flex-shrink-0 mr-2"
            >
              <span className="inline-block w-content px-2 h-10  font-sans font-bold bg-gray-100 rounded-xl">
                <div className="mt-1">
                  <InfoIcon />
                </div>
              </span>
            </Link>
          </center> */}
        </div>
      </div>
    </section>
  );
}
