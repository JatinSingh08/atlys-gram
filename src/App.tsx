import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route
          path="/signin"
          element={
            <SignInPage />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUpPage />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
