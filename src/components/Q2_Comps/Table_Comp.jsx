import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(name, deleteRow) {
  return { name, deleteRow };
}

export default function DenseTable(props) {
  // here we are generating individual rows per chosen food category in addition to the delete button showing for each + the logic for deleting food categories
  const rows = props.foodCategories.map((category) => (createData(
    category, 
    <IconButton aria-label="delete">
      <DeleteIcon id={category} onClickCapture={(event) => props.deleteFoodCategory(event.currentTarget.id)} />
    </IconButton>
)))

  // this is the actual table - the width at the top limits the entire table's width
  return (
    <TableContainer component={Paper} sx={{ width: '26%' }}>
      <Table sx={{ maxWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontFamily: 'Quicksand, sans-serif'}} align="center" colSpan={2}>Food Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{fontFamily: 'Quicksand, sans-serif'}} align="center" component="th" scope="row">
                {row.name} 
              </TableCell>
              <TableCell align="center">{row.deleteRow}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}