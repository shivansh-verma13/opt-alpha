import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import clsx from "clsx";

export const CardItem = ({ data, key }) => {
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-teal-200",
  ];

  const color = colors[key % colors.length];
  return (
    <Card
      sx={{
        display: "flex",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: 2,
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{ fontWeight: "bold" }}>
            {data.customer}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ color: "#94a3b8" }}
          >
            Transaction ID: {data.id}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            component="div"
            sx={{ color: "#f8fafc" }}
          >
            Amount: ${data.amount}
          </Typography>
        </CardContent>
        <Box
          className={clsx(
            color,
            "p-4 rounded-r-lg flex items-center justify-center w-24"
          )}
        >
          <Typography
            component="div"
            variant="h6"
            sx={{ fontWeight: "bold", color: "#fff" }}
            className={"p-4 rounded-full" +color}
          >
            {data.customer.charAt(0)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

CardItem.propTypes = {
  data: PropTypes.shape({
    customer: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }),
  key: PropTypes.number.isRequired,
};
