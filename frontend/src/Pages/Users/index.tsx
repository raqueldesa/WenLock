import { Box, Button, TextField, Typography } from "@mui/material";
import "./index.css";
import { Search } from "@mui/icons-material";
import UserList from "../../components/UserList";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register-user");
  };

  return (
    <Box component={"main"} className="main_home">
      <Typography variant="h3">Usuários</Typography>
      <Box className="flex box_">
        <Box className="flex search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Pesquisa"
            size="small"
            sx={{ width: "25ch" }}
            slotProps={{
              input: {
                startAdornment: <Search />,
              },
            }}
          />
          <Button
            variant="contained"
            className="btn_cadastrar"
            onClick={handleClick}
            sx={{
              backgroundColor: "#0290A4",
            }}
          >
            + Cadastrar Usuário
          </Button>
        </Box>
        <Box className="flex title_table">
          <Typography>Nome</Typography>
          <Typography>Ações</Typography>
        </Box>
        <UserList />
      </Box>
    </Box>
  );
}
