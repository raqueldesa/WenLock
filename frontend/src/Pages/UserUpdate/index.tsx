import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UserUpdate() {
  const { id } = useParams(); // Captura o ID do usuário a partir da URL
  const [formData, setFormData] = useState({
    name: "",
    matricula: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const baseURL = `${import.meta.env.VITE_URL_BACKEND}/users`;
  const navigate = useNavigate();

  // Função para buscar os dados do usuário com base no ID
  useEffect(() => {
    if (id) {
      axios
        .get(`${baseURL}/${id}`)
        .then((response) => {
          const { name, registration, email } = response.data;
          setFormData({
            ...formData,
            name,
            matricula: registration,
            email,
          });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          alert("Erro ao buscar usuário");
        });
    }
  }, [id]);

  // Função para lidar com mudanças nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Alternar visibilidade da senha
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      if (id) {
        // Se o ID existir, faça um PUT para atualizar o usuário
        await axios.patch(`${baseURL}/${id}`, {
          name: formData.name,
          registration: formData.matricula,
          email: formData.email,
        });
        alert("Usuário atualizado com sucesso!");
      } else {
        // Se não houver ID, faça um POST para criar um novo usuário
        await axios.post(baseURL, {
          name: formData.name,
          registration: formData.matricula,
          email: formData.email,
          password: formData.password,
        });
        alert("Usuário cadastrado com sucesso!");
      }
      navigate("/users");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Erro ao salvar usuário");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Atualização de Usuário" : "Cadastro de Usuário"}
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Dados do Usuário</Typography>
        <TextField
          fullWidth
          label="Nome Completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          inputProps={{ maxLength: 30 }}
          required
        />
        <TextField
          fullWidth
          label="Matrícula"
          name="matricula"
          value={formData.matricula}
          onChange={handleChange}
          margin="normal"
          inputProps={{ minLength: 6, maxLength: 10 }}
          required
        />
        <TextField
          fullWidth
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          inputProps={{ maxLength: 40 }}
          type="email"
          required
        />
      </Box>

      {!id && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Dados de Acesso</Typography>
          <TextField
            fullWidth
            label="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            type={showPassword ? "text" : "password"}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Repetir Senha"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            type={showConfirmPassword ? "text" : "password"}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button
          variant="outlined"
          color="secondary"
          type="reset"
          onClick={() => navigate("/users")}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {id ? "Atualizar" : "Cadastrar"}
        </Button>
      </Box>
    </Box>
  );
}
