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
FROM node:20-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy build output from builder stage
COPY --from=builder /app/dist ./dist

RUN find ./dist -name "*.d.ts" -type f -delete
RUN find ./dist -name "*.js.map" -type f -delete
RUN find ./dist -name "*.spec.js" -type f -delete
RUN find ./dist -name "tsconfig.build.tsbuildinfo" -type f -delete

# Expose port and start app
EXPOSE 4000
CMD ["node", "dist/main.js"]
