# Frontend Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .

CMD ["npx", "nx", "serve", "frontend"]
