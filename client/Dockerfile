# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /client
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --force
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 3000