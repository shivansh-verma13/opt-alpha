import { useState, useEffect } from "react";
import { CardItem } from "../Components/Card";
import { Navbar } from "../Components/Navbar";
import { data } from "../data";
import { TextField, Typography, Box, Paper } from "@mui/material";

export const Home = () => {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const savedFilter = localStorage.getItem("customerFilter");
    if (savedFilter) setFilter(savedFilter);
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((d) =>
        d.customer.toLowerCase().includes(filter.toLowerCase())
      )
    );
    localStorage.setItem("customerFilter", filter);
  }, [filter]);

  const totalSpending = filteredData.reduce((acc, { customer, amount }) => {
    acc[customer] = (acc[customer] || 0) + amount;
    return acc;
  }, {});

  const topCustomer = Object.entries(totalSpending).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="py-6 flex gap-4 flex-row">
        {/* Sidebar */}
        <Paper
          className="p-4 m-4 bg-gray-800 w-full max-w-xs h-max"
          elevation={3}
        >
          <Box className="flex flex-col">
            <TextField
              variant="outlined"
              fullWidth
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by customer name"
              className="mb-6 bg-white rounded"
              InputProps={{ style: { color: "black" } }}
            />
            <Typography variant="h5" gutterBottom>
              Total Spending per Customer:
            </Typography>
            <ul className="list-disc pl-5 mb-6">
              {Object.entries(totalSpending).map(([customer, total]) => (
                <li key={customer} className="text-lg">
                  {customer}: ${total}
                </li>
              ))}
            </ul>
            {topCustomer && (
              <div className="mt-4 text-center">
                <Typography variant="h6">Top Customer:</Typography>
                <Typography variant="body1">
                  {topCustomer[0]} with ${topCustomer[1]}
                </Typography>
              </div>
            )}
          </Box>
        </Paper>
        <Box className="flex-1 ">
          <div className="flex gap-6 flex-wrap">
            {filteredData.map((d, index) => (
              <CardItem data={d} key={index} />
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
};
