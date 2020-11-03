import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import CameraRoundedIcon from "@material-ui/icons/CameraRounded";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import db from "../../firebase/Firebase";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  sort: {
    width: 800,
    marginTop: 30,
  },
  text: {
    marginBottom: 30,
  },
  textError: {
    color: "red",
  },
  icon: {
    color: "blue",
  },
}));

const initialState = {
  nama: "",
  hargaBeli: 0,
  hargaJual: 0,
  stok: 0,
  jenis: "",
  date: new Date(),
};
const data = [
  { nama: "Serbuk", istilah: "Pulvis" },
  { nama: "Serbuk sejenis puyer", istilah: "Pulveres" },
  { nama: "Tablet", istilah: "compresi" },
  { nama: "Pil", istilah: "Pilulae" },
  { nama: "Kapsul", istilah: "Capsule" },
  { nama: "Kapsul Tablet", istilah: "Kaplet" },
  { nama: "Larutan", istilah: "Solutiones" },
  { nama: "Suspensi", istilah: "Suspensiones" },
  { nama: "Emulsi", istilah: "Elmusiones" },
  { nama: "Galenik", istilah: "Galenik" },
  { nama: "Ekstrak", istilah: "Ektraktum" },
  { nama: "Infusa", istilah: "Infusa" },
  { nama: "Imunoserum", istilah: "Immunosera" },
  { nama: "Saleb", istilah: "Unguenta" },
  { nama: "Suppositoria", istilah: "Suppositoria" },
  { nama: "Obat Tetes", istilah: "Guttae" },
  { nama: "Injeksi", istilah: "Injektiones" },
];
function Create({ obat }) {
  let history = useHistory();
  const classes = useStyles();
  const [brg, setBrg] = useState(initialState);
  const [valid, setValid] = useState({
    errorTextNama: "",
    errorTextHargaBeli: "",
    errorTextHargaJual: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    handleValid();
  };

  // Validation form tambah barang
  const handleValid = () => {
    const nama = [];
    for (let index = 0; index < obat.length; index++) {
      const element = obat[index];
      nama.push(element.nama);
    }
    if (nama.includes(brg.nama)) {
      console.log("sama cuy");
      setValid({ errorTextNama: "Nama barang sudah ada bro" });
    } else if (brg.hargaBeli === 0) {
      setValid({ errorTextHargaBeli: "Harga Tidak boleh nol" });
    } else if (brg.hargaJual === 0) {
      console.log("harga tidak boleh nol");
      setValid({ errorTextHargaJual: "Harga Tidak boleh nol" });
    } else if (
      (brg.hargaJual <= brg.hargaBeli && brg.hargaBeli != 0) ||
      brg.hargaJual != 0
    ) {
      setValid({
        errorTextHargaJual:
          "Harga jual harus lebih besar dan harga tidak boleh nol",
      });
      console.log("harga jual harus lebih besar");
    } else {
      db.collection("obats")
        .add({
          nama: brg.nama,
          hargaBeli: brg.hargaBeli,
          hargaJual: brg.hargaJual,
          stok: brg.stok,
          jenis: brg.jenis,
          date: brg.date,
        })
        .then((response) => {
          console.log(response);
          history.push("/obat");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // akhir handleValid form
  return (
    <Grid container justify="center">
      <Grid item className={classes.sort}>
        <Link to="/obat">
          <Fab
            size="small"
            color="primary"
            className={classes.text}
            aria-label="add"
          >
            <ArrowBackIosIcon />
          </Fab>
        </Link>
        <Typography className={classes.text} variant="h4" color="inherit">
          <CameraRoundedIcon className={classes.icon} />
          Tambah Obat
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <TextField
              label="Nama Obat"
              id="outlined-size-normal"
              variant="outlined"
              required
              value={brg.nama}
              onChange={(e) => setBrg({ ...brg, nama: e.target.value })}
            />
            <p className={classes.textError}>{valid.errorTextNama}</p>
            <TextField
              id="outlined-number"
              label="Harga Beli"
              type="number"
              variant="outlined"
              required
              value={brg.hargaBeli}
              onChange={(e) => setBrg({ ...brg, hargaBeli: e.target.value })}
            />
            <p className={classes.textError}>{valid.errorTextHargaBeli}</p>
            <TextField
              id="outlined-number"
              label="Harga Jual"
              type="number"
              variant="outlined"
              required
              value={brg.hargaJual}
              onChange={(e) => setBrg({ ...brg, hargaJual: e.target.value })}
            />
            <p className={classes.textError}>{valid.errorTextHargaJual}</p>
            <Autocomplete
              onChange={(e, v) => setBrg({ ...brg, jenis: v.nama })}
              className={classes.text}
              id="country-select-demo"
              style={{ width: 300 }}
              options={data}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionSelected={(option) => option.key}
              getOptionLabel={(option) => option.nama}
              renderOption={(option) => (
                <React.Fragment>{option.nama}</React.Fragment>
              )}
              required
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Jenis Obat"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Simpan
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
}

export default Create;
