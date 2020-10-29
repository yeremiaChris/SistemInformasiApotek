import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
// obat
import Daftar from "./components/obat/Daftar";
import Create from "./components/obat/Create";
import db from "./firebase/Firebase";

function App() {
  const [obat, setObat] = useState([]);
  useEffect(() => {
    return obats();
  }, []);
  const kode = "KD0";
  const obats = () => {
    db.collection("obats").onSnapshot(function (querySnapshot) {
      let list = [];
      querySnapshot.forEach(function (doc) {
        list.push(doc.data());
      });
      setObat(list);
    });
  };
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/obat" exact>
          <Daftar obat={obat} kode={kode} />
        </Route>
        <Route path="/obat/create">
          <Create setObat={setObat} obat={obat} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
