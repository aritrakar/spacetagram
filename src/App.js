import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PostsPage, SinglePost, NotFound } from "./components";

function App() {
  return (
    <Router>
      <div className="text-center">
        <Routes>
          <Route exact path="/posts/:date" element={<SinglePost />} />
          <Route exact path="/" element={<PostsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
