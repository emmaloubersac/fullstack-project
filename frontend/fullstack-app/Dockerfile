# Build Angular app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npx ng build --configuration production --project=fullstack-app

# Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/fullstack-app/browser /usr/share/nginx/html
EXPOSE 80

