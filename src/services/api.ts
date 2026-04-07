import axios, { AxiosError } from "axios";
import https from "node:https";

// Si la variable de entorno no existe, usamos la URL de Jakala por defecto
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://dulces-petalos.jakala.es/api/v1';

if (!apiBaseUrl) {
  throw new Error("Falta configurar NEXT_PUBLIC_API_URL en .env.local");
}

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(new Error("No hay conexion con el servicio de productos"));
    }

    const message = (error.response.data as { message?: string } | undefined)?.message;
    return Promise.reject(new Error(message || "Error al consultar la API"));
  },
);

