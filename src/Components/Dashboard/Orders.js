import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Typography } from '@material-ui/core';

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

// Generate Order Data
function createData(id, name, email, time, correctAnswers, wrongAnswers) {
  var score = roundToTwo(correctAnswers / (correctAnswers + wrongAnswers)) * 100
  return { id, name, email, time, correctAnswers, wrongAnswers, score };
}

const rows = [
  createData(0, 'Zmogus pavarde', 'zmogas.zmogius@gmail.com', '86', 2, 9),
  createData(1, 'Zmogeliuks pavarde', 'zmogas.zmogius@gmail.com', '82', 7, 4),
  createData(2, 'Zmogelis pavarde', 'zmogas.zmogius@gmail.com', '90', 10, 1),
  createData(3, 'Zmogelioks pavarde', 'zmogas.zmogius@gmail.com', '89', 3, 8),
  createData(4, 'Zmogus pavarde', 'zmogas.zmogius@gmail.com', '86', 2, 9),
  createData(5, 'Zmogeliuks pavarde', 'zmogas.zmogius@gmail.com', '82', 7, 4),
  createData(6, 'Zmogelis pavarde', 'zmogas.zmogius@gmail.com', '90', 10, 1),
  createData(7, 'Zmogelioks pavarde', 'zmogas.zmogius@gmail.com', '89', 3, 8),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>All Completions (8)</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Correct Answers</TableCell>
            <TableCell>
              Wrong Answers</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}
                <br></br>
                <Typography variant="caption" size="big">{row.email}</Typography>
              </TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.correctAnswers}</TableCell>
              <TableCell>{row.wrongAnswers}</TableCell>
              <TableCell align="right">%{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={() => props.setSelected('statistics')}>
          See statistics
        </Link>
      </div>
    </React.Fragment>
  );
}