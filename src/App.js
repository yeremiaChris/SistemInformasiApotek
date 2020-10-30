import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
// obat
import Daftar from "./components/obat/Daftar";
import Create from "./components/obat/Create";
import db from "./firebase/Firebase";
import Paginations from './components/obat/Pagination'
function App() {
  const [obat, setObat] = useState([]); 
  useEffect(() => {
    return obats();
  }, []);
  const kode = "KD0";
  const obats = () => {
    db.collection("obats").orderBy('date','desc')
      .onSnapshot(function (querySnapshot) {
        let list = [];
        querySnapshot.forEach(function (doc) {
          list.push(doc.data());
        });
        setObat(list);
      });
  };

 // pagination
  const [currentPage,setCurrentPage] = useState(1);
  const [obatPerPage] = useState(7);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // getCurrentPost
  const last = currentPage * obatPerPage;
  const first = last - obatPerPage;
  const currentObat = obat.slice(first,last);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/obat" exact>
          <Daftar obat={currentObat} kode={kode}/>
          <Paginations obatPerPage={obatPerPage} page={paginate} totalObat={obat.length}/>
        </Route>
        <Route path="/obat/create">
          <Create setObat={setObat} obat={obat} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
