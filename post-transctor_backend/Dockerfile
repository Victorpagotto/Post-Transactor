FROM node:16.14-alpine
WORKDIR /backend-server
COPY . .
RUN ["npm", "install"]
EXPOSE 3001
CMD ["npm", "run", "listen"]