import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function LineDiagramma() {
    const data = Array(Math.floor(Math.random() * 100)).fill(1).map((e , i)=>{
      return {
        name: i+1,
        pv: 100 + (5+ (Math.random() * 10)) * i,
        uv: 100 + (5+ (Math.random() * 10)) * i,
        amt: 2400,
      }
    })
      
    return (
        <div className='w-100 p-3 boxShadow' style={{height:400}}>
          <ResponsiveContainer className="w-100">
            <AreaChart
              data={data.length > 100 ? data.slice(data.length - 100 , data.length):data}
              margin={{
                left:-15
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="pv" stroke="#1994d8" fill="#1884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
}

export default LineDiagramma