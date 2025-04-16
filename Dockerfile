# === STAGE 1: Build the application ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copy and install all dependencies (including dev for Nest CLI)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source files and configs
COPY . ./

# Build the app
RUN npm run build

# Debug: List contents of the build output
RUN echo "=== Build Output ===" && ls -R /app/dist

# === STAGE 2: Create a lightweight runtime image ===
FROM alpine:3.20

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN apk add --no-cache nodejs npm
RUN npm install --force --omit=dev

RUN npm prune --production

# Copy build output from builder stage
COPY --from=builder /app/dist ./dist

# Expose port and start app
EXPOSE 8080
CMD ["node", "dist/main.js"]
