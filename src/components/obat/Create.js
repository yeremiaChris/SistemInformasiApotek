import React from "react";
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

function Create() {
  const classes = useStyles();

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
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <TextField
            label="Nama Obat"
            id="outlined-size-normal"
            variant="outlined"
            className={classes.text}
            required
          />
          <TextField
            id="outlined-number"
            label="Harga Beli"
            type="number"
            variant="outlined"
            className={classes.text}
            required
          />
          <TextField
            id="outlined-number"
            label="Harga Jual"
            type="number"
            variant="outlined"
            className={classes.text}
            required
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
}

export default Create;
