FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ARG VITE_BACKEND_API_URL
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
