import React, { Component, Fragment } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container } from 'semantic-ui-react';

import HeaderCustom from '../Projeto/HeaderCustom';

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const options = {
  title: {
    text: `Burndown Chart do projeto: x`,
    x: -20 //center
  },
  colors: ['blue', 'red'],
  plotOptions: {
    line: {
      lineWidth: 3
    },
    tooltip: {
      hideDelay: 200
    }
  },
  subtitle: {
    text: `Nome do projeto: `,
    x: -20
  },
  xAxis: {
    categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
                 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12']
  },
  yAxis: {
    title: {
      text: 'Pontos'
    },
    plotLines: [{
      value: 0,
      width: 1
    }]
  },
  tooltip: {
    valueSuffix: ' pts',
    crosshairs: true,
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  series: [{
    name: 'Ideal Burn',
    color: 'rgba(255,0,0,0.25)',
    lineWidth: 2,
    data: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
  }, {
    name: 'Actual Burn',
    color: 'rgba(0,120,200,0.75)',
    marker: {
      radius: 6
    },
    data: [100, 110, 125, 95, 64, 76, 62, 44, 35, 29, 18, 2]
  }]
}


const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

class Burndown extends Component {

    render() {
        return (
            <Fragment>
                <HeaderCustom />
                <Container textAlign='center'>
                    {/*<ResponsiveContainer width={600} height={300}>
                        <LineChart  data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                        </ResponsiveContainer>*/}
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={'chart'}
                            options={options}
                        />
                </Container>
            </Fragment>
                );
            }
        }
        
        export default Burndown;
        
        /*
data: (() =>{ 
        const ideal = [];
                let i: number;
                let totalSprintEstimativa = this.pontos.value;
                let totalDias = this.dias.value;
                //let totalSprintEstimativa = this.inserirdados.value.idpontos;
                //let totalDias = this.inserirdados.value.iddias;
                let idealIncrement = totalSprintEstimativa / totalDias;
        for (i = 0; i <= totalDias - 1; i++) {
                    ideal.push(idealIncrement * i);
                }
                console.log(ideal.reverse());
                return ideal;
                //[100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
})*/