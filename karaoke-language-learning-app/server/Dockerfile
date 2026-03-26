# Server image
FROM node:25-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

# Optional: build (if using TypeScript or bundlers)
# RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "test"]
