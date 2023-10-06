import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

const BarChar = ({ data }) => {

  return (
    <div className="flex">
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        {/* change */}
        <XAxis dataKey="login" />
        <YAxis />
        <Bar dataKey="followers" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarChar;
