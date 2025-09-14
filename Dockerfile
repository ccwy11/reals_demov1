# Use Node.js LTS as base image
FROM node:20-alpine AS base



# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install 
# frozen xxxx failed



# Copy the rest of the application
COPY . .

#Ensure .env.local is loaded by setting ENV before running


# Build the Next.js app
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]