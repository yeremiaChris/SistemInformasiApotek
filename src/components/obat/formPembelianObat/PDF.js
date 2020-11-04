import React, { useRef } from "react";
import Pdf from "react-to-pdf";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import NumberFormat from "react-number-format";
import Typography from "@material-ui/core/Typography";

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
const useStyles = makeStyles({
  table: {
    marginLeft: 50,
    marginTop: 10,
  },
  text: {
    marginTop: 50,
    marginLeft: 230,
  },
  text2: {
    marginLeft: 50,
  },
});
function PDF({ laporan }) {
  const classes = useStyles();

  const ref = useRef(null);
  //   const options = {
  //     orientation: "landscape",
  //     unit: "in",
  //     format: [4, 2],
  return (
    <>
      <div className="Post" ref={ref}>
        <Typography className={classes.text} variant="h6" color="inherit">
          Laporan Pembelian Obat
        </Typography>
        <Typography className={classes.text2} variant="h6" color="inherit">
          No Pembelian :
        </Typography>
        <Typography className={classes.text2} variant="h6" color="inherit">
          Tanggal :
        </Typography>
        <Grid container className={classes.table}>
          <Grid item>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">
                    Tanggal Pembelian
                  </StyledTableCell>
                  <StyledTableCell align="right">Nama Obat</StyledTableCell>
                  <StyledTableCell align="right">Jenis Obat</StyledTableCell>
                  <StyledTableCell align="right">Harga Satuan</StyledTableCell>
                  <StyledTableCell align="right">Jumlah Beli</StyledTableCell>
                  <StyledTableCell align="right">Total Beli</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className="Post" ref={ref}>
                {laporan &&
                  laporan.map((row) => (
                    <StyledTableRow key={row.namaObat}>
                      <StyledTableCell align="left">{row.date}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.namaObat}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.jenis}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <NumberFormat
                          value={row.hargaSatuan}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp. "}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.jumlahBeli}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <strong>
                          <NumberFormat
                            value={row.totalHarga}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                          />
                        </strong>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                <StyledTableRow>
                  <StyledTableCell align="right">
                    <strong>
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </strong>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
      <Pdf targetRef={ref} size="A4" filename="test.pdf">
        {({ toPdf }) => <button onClick={toPdf}>print</button>}
      </Pdf>
    </>
  );
}

export default PDF;
