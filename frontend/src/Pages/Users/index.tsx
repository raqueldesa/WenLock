import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "./index.css";
import { Search } from "@mui/icons-material";
import UserList from "../../components/UserList";

export default function Users() {
  return (
    <Box component={"main"} className="main_home">
      <Typography variant="h3">Usuários</Typography>
      <Box className="flex box_">
        <Box className="flex search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Pesquisa"
            sx={{ width: "25ch" }}
            slotProps={{
              input: {
                startAdornment: <Search />,
              },
            }}
          />
          <Button variant="contained" className="btn_cadastrar">
            + Cadastrar Usuário
          </Button>
        </Box>
        <Box className="flex title_table">
          <Typography>Nome</Typography>
          <Typography>Ações</Typography>
        </Box>
        <Box className="flex list">
          <UserList />
        </Box>
      </Box>
    </Box>
  );
}
