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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  sort: {
    width: 1200,
    marginTop: 30,
  },
  text: {
    marginBottom: 30,
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
};

function Create({ setObat, obat, navigate = false }) {
  let history = useHistory();
  const classes = useStyles();
  const [brg, setBrg] = useState(initialState);
  const onSubmit = (e) => {
    e.preventDefault();

    db.collection("obats")
      .add({
        nama: brg.nama,
        hargaBeli: brg.hargaBeli,
        hargaJual: brg.hargaJual,
        stok: brg.stok,
      })
      .then((response) => {
        console.log(response);
        history.push("/obat");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(brg);
  };
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
              className={classes.text}
              required
              value={brg.nama}
              onChange={(e) => setBrg({ ...brg, nama: e.target.value })}
            />
            <TextField
              id="outlined-number"
              label="Harga Beli"
              type="number"
              variant="outlined"
              className={classes.text}
              required
              value={brg.hargaBeli}
              onChange={(e) => setBrg({ ...brg, hargaBeli: e.target.value })}
            />
            <TextField
              id="outlined-number"
              label="Harga Jual"
              type="number"
              variant="outlined"
              className={classes.text}
              required
              value={brg.hargaJual}
              onChange={(e) => setBrg({ ...brg, hargaJual: e.target.value })}
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
