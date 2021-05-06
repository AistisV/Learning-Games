import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart(props) {
  const theme = useTheme();

  const data = props.data;

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        {props.mixed == "false" ?
          <BarChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <XAxis dataKey={props.x} />
            <YAxis />
            <Bar fill="#8884d8" dataKey={props.y} />
          </BarChart>

          :

          <BarChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              left: 24,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={props.x} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={props.y} stackId="a" fill="#8884d8" />
            <Bar dataKey={props.z} stackId="a" fill="#82ca9d" />
          </BarChart>
        }
      </ResponsiveContainer>
    </React.Fragment>
  );
}