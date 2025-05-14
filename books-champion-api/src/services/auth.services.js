import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import {
  validateString,
  validateEmail,
  validatePassword,
} from "../helpers/validations.js";

// Middleware para verificar el token JWT en las solicitudes
export const verifyToken = (req, res, next) => {
  //req: lo vamos a recibir por parámetro
  //extraemos el header y si no existe, un string vacío
  const header = req.header("Authorization") || "";
  //extraemos el valor del token
  const token = header.split(" ")[1];
  // Validamos el token
  if (!token) {
    return res.status(401).json({ message: "No posee autorización" });
  }

  try {
    //clave secreta
    const payload = jwt.verify(token, 'programacion3-2025');

    console.log(payload);
    //next: parámetro que agregamos en la función,
    //le indica a express que continúe con la siguiente consulta
    next();
  } catch (error) {
    //403: el solicitante no tiene los permisos requeridos para realizar la solicitud al servidor
    return res
      .status(403)
      .json({ message: "No posee los permisos para acceder." });
  }
};

export const registerUser = async (req, res) => {
  //validación de los datos ingresados por el usuario
  const result = validateRegisterUser(req.body);

  if (result.error) {
    return res.status(400).send({ message: result.message });
  }

  // Extrae name, email y password del body de la request
  const { name, email, password } = req.body;

  // Busca si ya existe un usuario con ese email
  const user = await User.findOne({
    where: { email },
  });

  // Si existe, devuelve error 400
  if (user)
    return res
      .status(400)
      .send({ message: "Este email ya se encuentra registrado." });

  // Configura 10 rondas de salt (costo computacional)
  const saltRounds = 10;

  // Genera un salt único
  const salt = await bcrypt.genSalt(saltRounds);

  // Hashea la contraseña con el salt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crea el nuevo usuario en la base de datos
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword, // Guarda el hash, no la contraseña en texto plano
  });

  // Devuelve solo el ID del nuevo usuario
  res.json(newUser.id);
};

export const loginUser = async (req, res) => {
  try {
    //vamos a validar los datos ingresados
    const result = validateLoginUser(req.body);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    // Extrae email y password del body de la request
    const { email, password } = req.body;

    // Busca el usuario por email
    const user = await User.findOne({
      where: { email },
    });

    // Si no existe, devuelve error 401 (No autorizado)
    if (!user) return res.status(401).send({ message: "Usuario no existente" });

    // Compara la contraseña ingresada con el hash almacenado
    const comparison = await bcrypt.compare(password, user.password);

    // Si no coinciden, devuelve error 401
    if (!comparison)
      return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

    // Clave secreta para firmar el token (debería estar en variables de entorno)
    const secretKey = "programacion3-2025";

    // Genera un token JWT que expira en 1 hora
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    // Devuelve el token al cliente
    return res.json(token);
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
};


const validateLoginUser = (req) => {
  const result = {
    error: false,
    message: "",
  };

  const { email, password } = req;

  //validación del email
  if (!email || !validateEmail(email)) {
    return {
      error: false,
      message: "Mail inválido.",
    };
  }

  //validación de password
  if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña inválida.",
    };
  }

  return result;
};

const validateRegisterUser = (req) => {
  const result = {
    error: false,
    message: "",
  };

  const { name, email, password } = req;

  //validación del nombre
  if (!name || !validateString(name, 3, null)) {
    return {
      error: true,
      message: "Nombre no válido",
    };
  }

  //validación del email
  if (!email || !validateEmail(email)) {
    return {
      error: true,
      message: "Mail inválido.",
    };
  }

  //validación de password
  if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña inválida.",
    };
  }

  return result;
};
