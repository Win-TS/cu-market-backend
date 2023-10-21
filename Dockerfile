FROM node:18
ENV PORT=4000
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt
COPY prisma ./prisma
COPY . .
RUN npm run build
RUN npm run db:dev:restart
CMD ["npm", "run", "start:dev"]