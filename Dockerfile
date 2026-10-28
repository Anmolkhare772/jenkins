
FROM node:22-alpine

WORKDIR /app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY frontend/ ./frontend/
RUN cd frontend && npm run build

COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

COPY backend/ ./backend/

COPY project/ ./project/

EXPOSE 5000

CMD ["node", "backend/server.js"]
