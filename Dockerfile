# Usa una imagen base de Node.js
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Astro
RUN npm run build

# Usa una imagen base más ligera para servir la aplicación
FROM nginx:alpine

# Copia los archivos generados a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para el servidor Nginx
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
