import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Signup from "./components/signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
