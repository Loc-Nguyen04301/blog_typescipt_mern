# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /server
COPY ["package.json", "package-lock.json", "./"]
RUN npm install 
RUN npm rebuild bcrypt
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 5000