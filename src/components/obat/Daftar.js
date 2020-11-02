import React, { useState } from "react";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";

import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/Sort";
import CameraRoundedIcon from "@material-ui/icons/CameraRounded";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// curreny
import NumberFormat from "react-number-format";
// dialog in material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    width: 1200,
    marginTop: 30,
  },
  sort: {
    width: 1200,
    marginTop: 30,
  },
  inputRoot: {
    color: "inherit",
  },
  kiri: {
    marginLeft: "800px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
    color: "blue",
  },
  button: {
    marginRight: 10,
  },
}));

// state
export default function CustomizedTables({
  obat,
  deleteData,
  banyak,
  rendah,
  baru,
  lama,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => banyak()}>Stok Terbanyak</MenuItem>
      <MenuItem onClick={() => rendah()}>Stok Terendah</MenuItem>
      <MenuItem onClick={() => baru()}>Terbaru</MenuItem>
      <MenuItem onClick={() => lama()}>Terlama</MenuItem>
    </Menu>
  );

  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // mengambil key
  const [key, setKey] = useState("");
  return (
    <>
      <Grid container justify="center">
        <Grid item>
          <IconButton></IconButton>
          <Typography className={classes.text} variant="h4" color="inherit">
            <CameraRoundedIcon className={classes.icon} />
            Daftar Obat
          </Typography>
          <AppBar position="static" className={classes.sort}>
            <Toolbar>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <SortIcon />
              </IconButton>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <div className={classes.kiri}>
                <Link to="/obat/create">
                  <Fab size="small" color="secondary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Nama</StyledTableCell>
                <StyledTableCell align="right">Stok</StyledTableCell>
                <StyledTableCell align="right">Harga Beli</StyledTableCell>
                <StyledTableCell align="right">Harga Jual</StyledTableCell>
                <StyledTableCell align="right">Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obat &&
                obat.map((row, index) => (
                  <StyledTableRow key={row.key}>
                    <StyledTableCell align="left">{row.nama}</StyledTableCell>
                    <StyledTableCell align="right">{row.stok}</StyledTableCell>
                    <StyledTableCell align="right">
                      <NumberFormat
                        value={row.hargaBeli}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <NumberFormat
                        value={row.hargaJual}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Fab
                        size="small"
                        aria-label="edit"
                        className={classes.button}
                      >
                        <EditIcon />
                      </Fab>
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="lihat"
                        className={classes.button}
                      >
                        <VisibilityIcon />
                      </Fab>
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="delete"
                        onClick={() => {
                          // setOpen(true);
                          console.log(row.key);
                          const key = row.key;
                          setKey(key);
                          handleClickOpen();
                        }}
                      >
                        <HighlightOffIcon />
                      </Fab>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin menghapus ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tidak
          </Button>
          <Button
            onClick={() => {
              deleteData(key);
            }}
            color="primary"
            autoFocus
          >
            ya
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
