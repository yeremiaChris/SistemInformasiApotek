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

import Print from "./components/obat/formPembelianObat/Print";
import PDF from "./components/obat/formPembelianObat/PDF";
function App() {
  const [obat, setObat] = useState([]);
  useEffect(() => {
    return obats();
  }, []);
  const dataList = obat;
  const obats = () => {
    db.collection("obats")
      .orderBy("date", "desc")
      .onSnapshot(function (querySnapshot) {
        let list = [];
        querySnapshot.forEach(function (doc) {
          const { date, hargaBeli, hargaJual, nama, stok, jenis } = doc.data();
          list.push({
            key: doc.id,
            doc,
            date,
            hargaJual,
            hargaBeli,
            nama,
            stok,
            jenis,
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
        const { date, hargaBeli, hargaJual, nama, stok, jenis } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
          jenis,
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
        const { date, hargaBeli, hargaJual, nama, stok, jenis } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
          jenis,
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
        const { date, hargaBeli, hargaJual, nama, stok, jenis } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
          jenis,
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
        const { date, hargaBeli, hargaJual, nama, stok, jenis } = doc.data();
        list.push({
          key: doc.id,
          doc,
          date,
          hargaJual,
          hargaBeli,
          nama,
          stok,
          jenis,
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
            jenis,
          } = doc.data();
          daftarLaporan.push({
            key: doc.id,
            doc,
            date,
            hargaSatuan,
            jumlahBeli,
            namaObat,
            totalHarga,
            jenis,
          });
        });
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

  // search data
  const excludeColumns = ["hargaBeli", "hargaJual", "stok"];
  const [searchText, setSearchText] = useState("");
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };
  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (value === "") {
      setObat(dataList);
    } else {
      const filteredData = obat.filter((item) => {
        return Object.keys(item).some((no) =>
          excludeColumns.includes(no)
            ? false
            : item[no].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setObat(filteredData);
    }
  };
  // akhir search data
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
            searchText={searchText}
            handleSearch={handleChange}
          />
          <Paginations
            obatPerPage={obatPerPage}
            page={paginate}
            totalObat={obat.length}
          />
        </Route>
        <Route path="/obat/create">
          <Create obat={obat} />
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
        <Route path="/coba">
          <Print obat={obat} />
        </Route>
        <Route path="/view">
          <PDF laporan={currentLaporan} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
