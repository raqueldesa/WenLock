import { Box, Button, TextField, Typography } from "@mui/material";
import "./index.css";
import { Search } from "@mui/icons-material";
import UserList from "../../components/UserList";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [users, setUsers] = useState([]); // Lista de usuários
  const [allUsers, setAllUsers] = useState([]); // Lista de usuários
  const baseURL = `${import.meta.env.VITE_URL_BACKEND}/users`;

  useEffect(() => {
    // Fetch data from API using Axios
    axios
      .get(baseURL)
      .then((response) => {
        setAllUsers(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Função para lidar com mudanças no campo de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Função para buscar usuários pelo nome
  const fetchUsersByName = async (name) => {
    try {
      const response = await axios.get(`${baseURL}/search/${name}`);
      setUsers(response.data);
      console.log(response.data); // Atualiza a lista de usuários com o resultado da busca
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setUsers([]); // Limpa a lista se nenhum usuário for encontrado
    }
  };

  // Efeito para buscar usuários quando o termo de pesquisa mudar
  useEffect(() => {
    if (searchTerm) {
      fetchUsersByName(searchTerm); // Faz a busca quando há um termo
    } else {
      setUsers(allUsers); // Limpa a lista quando o campo de busca estiver vazio
    }
  }, [searchTerm]);

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
            value={searchTerm}
            onChange={handleSearchChange} // Atualiza o valor de pesquisa
            InputProps={{
              startAdornment: <Search />,
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
        <UserList users={users} setUsers={setUsers} searchTerm={searchTerm} />
        {/* Passa a lista de usuários para o UserList */}
      </Box>
    </Box>
  );
}
