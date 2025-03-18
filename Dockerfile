FROM node:20
WORKDIR /app

# Copy package.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the frontend (this generates the `dist/` folder)
RUN npm run build

# Install a lightweight static file server
RUN npm install -g serve

# Expose the port your frontend app will run on
EXPOSE 3000

# Use serve to serve the frontend
CMD ["serve", "-s", "dist", "-l", "3000"]
