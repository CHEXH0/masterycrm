
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", total: 8500 },
  { name: "Feb", total: 9200 },
  { name: "Mar", total: 7800 },
  { name: "Apr", total: 12400 },
  { name: "May", total: 14500 },
  { name: "Jun", total: 11300 },
  { name: "Jul", total: 15800 },
  { name: "Aug", total: 16200 },
  { name: "Sep", total: 18100 },
  { name: "Oct", total: 19500 },
  { name: "Nov", total: 21200 },
  { name: "Dec", total: 23500 },
];

const SalesChart = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Premium Revenue</CardTitle>
        <CardDescription>Monthly premium revenue in USD</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, 'Premium']}
            />
            <Bar
              dataKey="total"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
