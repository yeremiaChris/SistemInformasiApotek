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
    obats();
  }, []);
  const kode = "KD0";
  const obats = () => {
    db.collection("obats")
      .get()
      .then((response) => {
        let list = [];
        response.forEach((doc) => {
          let data = doc.data();
          list.push({
            nama: data.nama,
            stok: data.stok,
            hargaJual: data.hargaJual,
            hargaBeli: data.hargaBeli,
          });
        });
        setObat(list);
      })
      .catch((err) => console.log(err));
  };
  console.log(obat);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/obat">
          <Daftar obat={obat} kode={kode} />
        </Route>
        <Route path="/createObat">
          <Create />
        </Route>
      </div>
    </Router>
  );
}

export default App;
