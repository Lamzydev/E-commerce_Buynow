FROM node:20-bullseye-slim

WORKDIR /app

# Install only production deps for smaller image
COPY package.json package-lock.json ./
# Use npm ci to install exact deps
RUN npm ci --only=production

# Copy app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
