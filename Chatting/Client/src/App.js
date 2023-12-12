// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SetAvatar from "./components/SetAvatar";
// import Chat from "./pages/Chat";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/setAvatar" element={<SetAvatar />} />
//         <Route path="/" element={<Chat />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => (
  <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setAvatar" element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  </Router>
);

export default App;
