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
import { toast } from "react-toastify";

export default function UserUpdate() {
  const { id } = useParams(); // Captura o ID do usuário a partir da URL
  const [formData, setFormData] = useState({
    name: "",
    matricula: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
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
          toast.error("Erro ao buscar usuário", error.mesage);
        });
    }
  }, [id]);

  // Validação de campos
  const validateFields = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "name":
        // Apenas letras
        errors.name = /^[A-Za-zÀ-ú\s]+$/.test(value)
          ? ""
          : "Nome deve conter apenas letras";
        break;
      case "matricula":
        // Apenas números
        errors.matricula = /^[0-9]+$/.test(value)
          ? ""
          : "Matrícula deve conter apenas números";
        break;
      case "email":
        // Email válido
        errors.email = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
          value
        )
          ? ""
          : "E-mail inválido";
        break;
      case "password":
        // Senha alfanumérica de 6 dígitos
        errors.password = /^[A-Za-z0-9]{6,}$/.test(value)
          ? ""
          : "Senha deve ser alfanumérica com pelo menos 6 caracteres";
        break;
      case "confirmPassword":
        // Confirmar se as senhas coincidem
        errors.confirmPassword =
          value === formData.password ? "" : "As senhas não coincidem";
        break;
      default:
        break;
    }

    setFormErrors(errors);

    // Verificar se o formulário é válido
    setIsFormValid(
      !errors.name &&
        !errors.matricula &&
        !errors.email &&
        (!id ? !errors.password && !errors.confirmPassword : true)
    );
  };

  // Função para lidar com mudanças nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateFields(name, value);
  };

  // Alternar visibilidade da senha
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.warning("Por favor, corrija os erros antes de enviar.");
      return;
    }

    try {
      if (id) {
        // Se o ID existir, faça um PATCH para atualizar o usuário
        await axios.patch(`${baseURL}/${id}`, {
          name: formData.name,
          registration: formData.matricula,
          email: formData.email,
        });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        // Se não houver ID, faça um POST para criar um novo usuário
        await axios.post(baseURL, {
          name: formData.name,
          registration: formData.matricula,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Cadastro realizado!");
      }
      navigate("/users");
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Erro ao salvar usuário", error.mesage);
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
          error={!!formErrors.name}
          helperText={formErrors.name}
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
          error={!!formErrors.matricula}
          helperText={formErrors.matricula}
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
          error={!!formErrors.email}
          helperText={formErrors.email}
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
            error={!!formErrors.password}
            helperText={formErrors.password}
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
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
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
          onClick={() => {
            toast.warning("Processo cancelado!");
            navigate("/users");
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isFormValid}
        >
          {id ? "Atualizar" : "Cadastrar"}
        </Button>
      </Box>
    </Box>
  );
}
