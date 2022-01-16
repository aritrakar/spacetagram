import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PostsPage from "./components/pages/PostsPage";
import SinglePost from "./components/pages/SinglePost";
import Navbar from "./components/Navbar";
import NotFoundGif from "./assets/NotFound.gif";

function App() {
  const NotFound = () => {
    return (
      <>
        <Navbar />
        <center>
          <div className="mt-10">
            {/* <Lottie options={defaultOptions} height={350} width={350} /> */}
            <img src={NotFoundGif} alt="not found" />
          </div>

          <h1 className="lg:text-3xl text-2xl font-sans font-bold mt-10 mr-0 ml-2">
            Sorry, but that route could not be found.
          </h1>
        </center>
      </>
    );
  };

  return (
    <Router>
      <div className="App ">
        <Routes>
          <Route exact path="/" element={<PostsPage />} />
          <Route exact path="/posts/:date" element={<SinglePost />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
