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
import { useHistory } from "react-router-dom";
import db from "../../../firebase/Firebase";
import { Alert } from "@material-ui/lab";
import NumberFormat from "react-number-format";
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
  error: {
    color: "red",
  },
}));

const initialState = {
  keyObat: "",
  obat: "",
  jumlah: 0,
  hargaSatuan: 0,
  total: 0,
  stokAwal: 0,
};

// valid
const validField = {
  field: "",
  error: "",
};

function Create({ obat, beli }) {
  let history = useHistory();
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(parseInt(form.jumlah) + parseInt(form.stokAwal));
    handleValid();
    // db.collection("obats")
    //   .doc(form.keyObat)
    //   .update({ stok: newStok })
    //   .then((res) => {
    //     console.log("succes");
    //     history.push("/obat");
    //   })
    //   .catch((err) => {
    //     console.log("gagal");
    //   });
  };

  // validation
  const [valid, setValid] = useState(validField);

  // email
  const [alert, setAlert] = useState(false);
  const handleValid = () => {
    if (form.jumlah <= 0) {
      setValid({
        fields: "jumlah",
        error:
          "Angka pada jumlah tidak boleh nol atau lebih kecil dari nol !!!",
      });
      setAlert(true);
    } else {
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
    }
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
        <Typography className={classes.text} variant="h5" color="inherit">
          <CameraRoundedIcon className={classes.icon} />
          Form Pembelian Obat
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <Autocomplete
              onChange={(e, v) => {
                setForm({
                  ...form,
                  keyObat: v.key,
                  obat: v.nama,
                  stokAwal: v.stok,
                  hargaSatuan: v.hargaBeli,
                  total: v.hargaBeli,
                });
              }}
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
              required
              renderInput={(params) => (
                <TextField
                  required
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
              className={classes.text}
              id="outlined-number"
              label="Jumlah Beli"
              type="number"
              variant="outlined"
              value={form.jumlah}
              onChange={(e) => {
                setForm({
                  ...form,
                  jumlah: e.target.value,
                  total:
                    e.target.value == 0
                      ? form.hargaSatuan
                      : form.hargaSatuan * e.target.value,
                });
              }}
            />

            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6" color="inherit">
                  Harga Satuan
                </Typography>
                <Typography
                  className={classes.text}
                  variant="h6"
                  color="inherit"
                >
                  <NumberFormat
                    value={form.hargaSatuan}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="inherit">
                  <strong>Total Harga</strong>
                </Typography>
                <Typography
                  className={classes.text}
                  variant="h6"
                  color="inherit"
                >
                  <NumberFormat
                    value={form.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </Typography>
              </Grid>
            </Grid>

            {alert ? (
              <Alert
                variant="outlined"
                severity="error"
                className={classes.text}
              >
                {valid.error}
              </Alert>
            ) : (
              ""
            )}
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
