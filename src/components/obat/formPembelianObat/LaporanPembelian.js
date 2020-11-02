import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  sort: {
    width: 700,
    marginTop: 30,
    margin: "auto",
    textAlign: "center",
  },
  table: {
    width: 1200,
    marginTop: 30,
  },
  inputRoot: {
    color: "inherit",
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
}));
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
function LaporanPembelian({ laporan }) {
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
      <MenuItem onClick={handleMenuClose}>Kode</MenuItem>
      <MenuItem onClick={handleMenuClose}>Terbaru</MenuItem>
    </Menu>
  );
  return (
    <>
      <Grid container className={classes.sort}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h2">
            Data Pembelian Obat
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <AppBar position="static" className={classes.table}>
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
            </Toolbar>
          </AppBar>
          {renderMenu}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">
                  Tanggal Pembelian
                </StyledTableCell>
                <StyledTableCell align="right">Nama Obat</StyledTableCell>
                <StyledTableCell align="right">Harga Beli</StyledTableCell>
                <StyledTableCell align="right">Jumlah Beli</StyledTableCell>
                <StyledTableCell align="right">Total Beli</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laporan &&
                laporan.map((row) => (
                  <StyledTableRow key={row.namaObat}>
                    <StyledTableCell align="left">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.namaObat}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.hargaSatuan}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.jumlahBeli}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <strong>{row.totalHarga}</strong>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}

export default LaporanPembelian;
