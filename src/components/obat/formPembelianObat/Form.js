import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import db from "../../../firebase/Firebase";

// select
/* eslint-disable no-use-before-define */
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  sort: {
    width: 700,
    marginTop: 30,
  },
  text: {
    marginBottom: 30,
  },
  icon: {
    color: "blue",
    marginRight: 10,
  },
}));

const initialState = {
  keyObat: "",
  obat: "",
  jumlah: 0,
  stokAwal: 0,
};

function Create({ obat, beli }) {
  let history = useHistory();
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(parseInt(form.jumlah) + parseInt(form.stokAwal));
    const newStok = parseInt(form.jumlah) + parseInt(form.stokAwal);
    db.collection("obats")
      .doc(form.keyObat)
      .update({ stok: newStok })
      .then((res) => {
        console.log("succes");
        history.push("/obat");
      })
      .catch((err) => {
        console.log("gagal");
      });
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
          Form Pembelian Obat
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <Autocomplete
              onChange={(e, v) =>
                setForm({
                  ...form,
                  keyObat: v.key,
                  obat: v.nama,
                  stokAwal: v.stok,
                })
              }
              className={classes.text}
              id="country-select-demo"
              style={{ width: 300 }}
              options={obat}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionSelected={(option) => option.key}
              getOptionLabel={(option) => option.nama}
              renderOption={(option) => (
                <React.Fragment>{option.nama}</React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pilih Obat"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <TextField
              id="outlined-number"
              label="Jumlah Beli"
              type="number"
              variant="outlined"
              className={classes.text}
              required
              value={form.jumlah}
              onChange={(e) => {
                setForm({ ...form, jumlah: e.target.value });
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              BELI
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
}

export default Create;
