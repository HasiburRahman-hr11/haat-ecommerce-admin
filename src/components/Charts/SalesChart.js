import React from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const data = [
    {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Aug',
        uv: 3490,
        pv: 4900,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 4000,
        pv: 3200,
        amt: 2400,
    },
    {
        name: 'Oct',
        uv: 3000,
        pv: 5398,
        amt: 2210,
    },
    {
        name: 'Nov',
        uv: 2000,
        pv: 6800,
        amt: 2290,
    },
    {
        name: 'Dec',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    }
];

const SalesChart = () => {
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
                    <Area type="monotone" dataKey="uv" fill="var(--primary-color)" stroke="#8884D8" />
                    <Bar dataKey="pv" barSize={10} fill="#0BAA5C" />
                    <Line type="monotone" dataKey="amt" stroke="#FF8042" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;