// import { InfoIcon } from "../assets/icons";

export default function Hero() {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-24 mt-5 mx-auto sm:px-6 lg:px-8 mr-2">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-2xl from-red-500 via-blue-600 to-purple-600 bg-clip-text 
            font-extrabold font-sans text-transparent sm:text-5xl bg-gradient-to-r"
          >
            Capturing the <br /> beauty of space
          </h1>
          <br />
          <p className=" font-sans mx-auto mt-6 text-xl max-w-xl">
            Spacetagram is brought to <br /> you by NASA's image API
          </p>

          {/* <center>
            <a
              href="https://github.com/aritrakar/spacetagram"
              target="_blank"
              rel="noreferrer noopener"
              className="flex justify-center mt-8 flex-shrink-0 mr-2"
            >
              <span className="inline-block w-content px-2 h-10  font-sans font-bold bg-gray-100 rounded-xl">
                <div className="mt-1">
                  <InfoIcon />
                </div>
              </span>
            </a>
          </center> */}
        </div>
      </div>
    </section>
  );
}
