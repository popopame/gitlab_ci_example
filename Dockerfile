FROM node:10

# Creation du dossier de l'application et copie des fichiers nécessaires
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# Bundle du programme
EXPOSE 3000
CMD [ "npm", "run", "serve" ]