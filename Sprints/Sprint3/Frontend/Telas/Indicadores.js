import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, valor, parcelas, saldodevedor, qoperações) {
  return { name, valor, parcelas, saldodevedor, qoperações };
}

const rows = [
  createData('1', 0.00, 53, 0.00, 7),
  createData('2', 0.00, 85, 0.00, 1),
  createData('3', 2102631.68, 92, 851016.41, 20),
  createData('4', 242311.68, 20, 147746.41, 7),
  createData('5', 0.00, 13, 0.00, 143),
];

export default function Indicadores() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Indicadores de Negócio</TableCell>
            <TableCell align="right">Valor Adquirido por Remessa</TableCell>
            <TableCell align="right">Qtde de Parcelas</TableCell>
            <TableCell align="right">Saldo Devedor</TableCell>
            <TableCell align="right">Qtde de Operações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.valor}</TableCell>
              <TableCell align="right">{row.parcelas}</TableCell>
              <TableCell align="right">{row.saldodevedor}</TableCell>
              <TableCell align="right">{row.qoperações}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}