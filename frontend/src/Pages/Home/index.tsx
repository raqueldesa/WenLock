import { Box, Typography } from "@mui/material";
import welcome from "../../assets/welcome.svg";
import "./index.css";

export default function Home() {
  return (
    <Box component={"main"} className="main_home">
      <Typography variant="h3">Home</Typography>
      <Box className="flex box">
        <Box className="flex titles">
          <Typography variant="h4">Olá Raquel!</Typography>
          <Typography>{new Date().toLocaleDateString()}</Typography>
        </Box>
        <Box className="flex img">
          <img src={welcome} alt="welcome image" width={400} />
          <Typography
            className={"btn_welcome"}
            sx={{ fontWeight: "bold", mt: "2em" }}
          >
            Bem-vindo ao WenLock!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
