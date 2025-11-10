# Installer image
FROM node:20-alpine AS installer
WORKDIR /app
COPY package*.json ./
RUN npm install

# Builder image
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner image
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3033
CMD ["npm", "start"]
