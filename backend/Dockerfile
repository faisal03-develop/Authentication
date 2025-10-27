FROM node:20-alpine
WORKDIR /usr/src/app

# copy package files first for caching
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

COPY . .

EXPOSE 4000
CMD ["node", "src/index.js"]
