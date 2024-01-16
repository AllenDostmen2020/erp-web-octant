# Imagen base
FROM node:18

# Crear directorio de trabajo
RUN mkdir -p /app

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json
COPY package.json /app

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . /app

# Iniciar la aplicación
CMD ["npm", "start"]
