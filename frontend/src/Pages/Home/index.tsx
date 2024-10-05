import { Box, Typography } from "@mui/material";
import welcome from "../../assets/welcome.svg";
import "./index.css";

export default function Home() {
  return (
    <Box component={"main"} className="main_home">
      <Typography variant="h3">Home</Typography>
      <Box className="flex box">
        <Box className="flex titles">
          <Typography variant="h4">Olá Milena!</Typography>
          <Typography>22, Novembro 2024</Typography>
        </Box>
        <Box className="flex img">
          <img src={welcome} alt="welcome image" width={400} />
          <Typography className={"btn_welcome"} sx={{ fontWeight: "bold" }}>
            Bem-vindo ao WenLock!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
