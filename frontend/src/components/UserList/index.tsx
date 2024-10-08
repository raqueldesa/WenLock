import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useNavigate } from "react-router-dom";
import "./index.css";
import lupa from "../../assets/lupa.svg";
import { toast } from "react-toastify";

export default function UserList({ users, setUsers, searchTerm }) {
  const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado para visualização
  const [selectedIdUser, setSelectedIdUser] = useState(null); // Usuário selecionado para visualização
  const [open, setOpen] = useState(false); // Controla o estado do modal
  const [openDelete, setOpenDelete] = useState(false);
  const baseURL = `${import.meta.env.VITE_URL_BACKEND}/users`;
  const navigate = useNavigate();

  const handleEditClick = (user) => {
    navigate(`/update-user/${user.id}`);
  };

  const handleViewClick = (user) => {
    setSelectedUser(user); // Define o usuário selecionado
    console.log(user);
    setOpen(true); // Abre o modal
  };
  const handleDeleteClick = (id: number) => {
    setSelectedIdUser(id); // Define o usuário selecionado
    setOpenDelete(true); // Abre o modal
  };

  const handleClose = () => {
    setOpen(false); // Fecha o modal
  };
  const handleCloseDelete = () => {
    setOpenDelete(false); // Fecha o modal
  };

  const handleDelete = () => {
    axios
      .delete(`${baseURL}/${selectedIdUser}`)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedIdUser)
        );
        console.log("Usuário deletado");
        toast.success("Exclusão Realizada!");
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDelete(false);
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);

    // Pega o dia, mês e ano
    const day = String(date.getDate()).padStart(2, "0"); // Adiciona zero à esquerda se necessário
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês é 0 indexado, por isso +1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <Box className="flex list">
      {users.length > 0 ? (
        users.map((user) => (
          <Box key={user.id} className={"flex user"}>
            <Typography>{user.name}</Typography>
            <Box className={"actions"}>
              <IconButton color="primary" onClick={() => handleViewClick(user)}>
                <VisibilityOutlinedIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => handleEditClick(user)}>
                <ModeOutlinedIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => handleDeleteClick(user.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))
      ) : (
        <Box className="flex empty">
          {searchTerm ? (
            <Box className={"flex img"}>
              <img src={lupa} alt="welcome image" width={150} />
              <Typography variant="h6">Nenhum Resultado Encontrado</Typography>
              <Typography variant="body1">
                Não foi possível achar nenhum resultado para sua busca.
              </Typography>{" "}
              <Typography variant="body1">
                Tente refazer a pesquisa para encontrar o que busca.
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6">Nenhum Usuário Registrado</Typography>
              <Typography variant="body1">
                Clique em “Cadastrar Usuário” para começar a cadastrar.
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Modal para visualização do usuário */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Informações do Usuário</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography>
                <strong>Nome:</strong> {selectedUser.name}
              </Typography>
              <Typography>
                <strong>Matrícula:</strong> {selectedUser.registration}
              </Typography>
              <Typography>
                <strong>E-mail:</strong> {selectedUser.email}
              </Typography>
              <Typography>
                <strong>Data de criação:</strong>{" "}
                {formatDate(selectedUser.createdAt)}
              </Typography>
              <Typography>
                <strong>Última edição:</strong>

                {formatDate(selectedUser.createdAt) ===
                formatDate(selectedUser.updatedAt)
                  ? "Nenhuma"
                  : selectedUser.updatedAt}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para deletar o usuário */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Deseja excluir?</DialogTitle>
        <DialogContent>
          <Typography>O usuário será excluído.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Não
          </Button>
          <Button onClick={handleDelete} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
