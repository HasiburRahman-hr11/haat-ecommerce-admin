import React from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Jun',
        uv: 890,
        pv: 1000,
        amt: 1500,
        cnt: 790,
    },
    {
        name: 'Jul',
        uv: 868,
        pv: 967,
        amt: 1800,
        cnt: 590,
    },
    {
        name: 'Aug',
        uv: 1397,
        pv: 1098,
        amt: 989,
        cnt: 350,
    },
    {
        name: 'Sep',
        uv: 1280,
        pv: 1600,
        amt: 2528,
        cnt: 980,
    },
    {
        name: 'Oct',
        uv: 1520,
        pv: 1108,
        amt: 1100,
        cnt: 460,
    },
    {
        name: 'Nov',
        uv: 1400,
        pv: 680,
        amt: 1700,
        cnt: 380,
    },
];

const VisitorChart = () => {
    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="amt" fill="#FFF7CD" stroke="#8884d8" />
                    <Bar dataKey="pv" barSize={20} fill="#848DD1" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                    <Scatter dataKey="cnt" fill="#0BAA5C" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VisitorChart;