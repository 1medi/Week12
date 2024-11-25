import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./components/countries";
import Details from "./components/details";
import "./App.css"
function App() {
  return (
    <div>
<Router>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/countries" element={<Countries />}>
          <Route path=":cca2" element={<Details />} />
        </Route>
      </Routes>
    </Router>
    </div>

  );
}

export default App;
