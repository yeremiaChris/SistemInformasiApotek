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
  obat: "",
  jumlah: 0,
};

function Create({ setObat, obat }) {
  let history = useHistory();
  const classes = useStyles();
  const [form, setForm] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
              fullWidth
              className={classes.text}
              id="combo-box-demo"
              options={obat}
              getOptionLabel={(option) => option.nama}
              style={{ width: 300 }}
              onChange={(e) => {
                setForm({ ...form, obat: e.target.textContent });
                console.log(e.target.textContent);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={form.obat}
                  label="Pilih obat"
                  variant="outlined"
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
              onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
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
