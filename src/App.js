import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
// obat
import Daftar from "./components/obat/Daftar";
import Create from "./components/obat/Create";
import db from "./firebase/Firebase";
import Paginations from "./components/obat/Pagination";
import Form from "./components/obat/formPembelianObat/Form";
import LaporanPembelian from "./components/obat/formPembelianObat/LaporanPembelian";
import {
  terbanyak,
  terendah,
  terbaru,
  terlama,
} from "./components/obat/sortby/Sort";
function App() {
  const [obat, setObat] = useState([]);
  useEffect(() => {
    return obats();
  }, []);

  const obats = () => {
    db.collection("obats")
      .orderBy("date", "desc")
      .onSnapshot(function (querySnapshot) {
        let list = [];
        querySnapshot.forEach(function (doc) {
          const { date, hargaBeli, hargaJual, nama, stok } = doc.data();
          list.push({
            key: doc.id,
            doc,
            date,
            hargaJual,
            hargaBeli,
            nama,
            stok,
          });
        });
        setObat(list);
      });
  };
  // sortby
  // terbanyak
  const banyak = () => {
    terbanyak.onSnapshot(function (querySnapshot) {
      let list = [];
      querySnapshot.forEach(function (doc) {
        const { date, hargaBeli, hargaJual, nama, stok } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
        });
      });
      setObat(list);
    });
  };
  // akhirTerbanyak
  // terendah
  const rendah = () => {
    terendah.onSnapshot(function (querySnapshot) {
      let list = [];
      querySnapshot.forEach(function (doc) {
        const { date, hargaBeli, hargaJual, nama, stok } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
        });
      });
      setObat(list);
    });
  };
  // akhir terendah
  // awal terbaru
  const baru = () => {
    terbaru.onSnapshot(function (querySnapshot) {
      let list = [];
      querySnapshot.forEach(function (doc) {
        const { date, hargaBeli, hargaJual, nama, stok } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
        });
      });
      setObat(list);
    });
  };
  // akhir terbaru
  // awal terendah
  const lama = () => {
    terlama.onSnapshot(function (querySnapshot) {
      let list = [];
      querySnapshot.forEach(function (doc) {
        const { date, hargaBeli, hargaJual, nama, stok } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
        });
      });
      setObat(list);
    });
  };
  // akhir terendah
  // deleteData
  const deleteData = (id) => {
    db.collection("obats")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("berhasil di hapus");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // akhir delete data

  // laporanPembelian
  const [laporan, setLaporan] = useState([]);
  useEffect(() => {
    return laporanPembelian();
  }, []);
  const laporanPembelian = () => {
    db.collection("pembelianObats")
      .orderBy("date", "asc")
      .onSnapshot(function (querySnapshot) {
        let daftarLaporan = [];
        querySnapshot.forEach(function (doc) {
          const {
            date,
            hargaSatuan,
            jumlahBeli,
            namaObat,
            totalHarga,
          } = doc.data();
          daftarLaporan.push({
            key: doc.id,
            doc,
            date,
            hargaSatuan,
            jumlahBeli,
            namaObat,
            totalHarga,
          });
        });
        console.log(daftarLaporan);
        setLaporan(daftarLaporan);
      });
  };
  // akhir laporan Pembelian
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [obatPerPage] = useState(7);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // getCurrentPost
  // delete data
  const last = currentPage * obatPerPage;
  const first = last - obatPerPage;
  const currentObat = obat.slice(first, last);
  const currentLaporan = laporan.slice(first, last);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/obat" exact>
          <Daftar
            obat={currentObat}
            deleteData={deleteData}
            banyak={banyak}
            rendah={rendah}
            baru={baru}
            lama={lama}
          />
          <Paginations
            obatPerPage={obatPerPage}
            page={paginate}
            totalObat={obat.length}
          />
        </Route>
        <Route path="/obat/create">
          <Create setObat={setObat} obat={obat} />
        </Route>
        <Route path="/obat/beli">
          <Form obat={obat} />
        </Route>
        <Route path="/obat/laporanPembelian">
          <LaporanPembelian laporan={currentLaporan} />
          <Paginations
            obatPerPage={obatPerPage}
            page={paginate}
            totalObat={laporan.length}
          />
        </Route>
      </div>
    </Router>
  );
}

export default App;
