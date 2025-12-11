FROM node:20-alpine AS base
WORKDIR /usr/src/app
ENV NODE_ENV=production

FROM base AS dev
ENV NODE_ENV=development
RUN apk add --no-cache netcat-openbsd
RUN npm install -g ts-node-dev
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"] 

FROM base AS build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3001
CMD ["npm", "start"]