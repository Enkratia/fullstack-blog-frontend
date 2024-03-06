FROM node:20.11.1 AS BASE

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --cache .npm --cpu=x64 --os=linux sharp

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

# Environment variables must be present at build time
# ARG NEXTAUTH_SECRET
# ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
# ARG NEXTAUTH_URL
# ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=dummy_secret
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=http://localhost:3000

ARG NODE_ENV
ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

USER root

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Environment variables must be present at build time
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=dummy_secret
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=http://localhost:3000

ARG NODE_ENV
ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]


######################################################
# create dev/prod container/image:
# docker build -f Dockerfile.dev -t nextjsdev:1.0 .
# docker build -f Dockerfile.prod -t nextjsprod:1.0 .
#
# -f === filename (if filename !== Dockerfile)
# -t === tag (to give the image a name)
# 1.0 === volume of image file (any)
# . === to place image in the same directory

# run dev container/image:
# docker run -d -p 3000:3000 nextjsdev:1.0
# -d === remain terminal trackable ?
# 3000:3000 === local port? : port of the image?
# nextjsdev:1.0 === name:volume of image

# show running/stopped containers:
# docker ps

# stop container:
# docker stop 62c4a683eea4
# 62c4a683eea4 === container ID

# show all images
# docker images

# COPY package.json package-lock.json* ./

#################
# Dockerfile.dev:
#################
# FROM node:20.11.1

# WORKDIR /app

# COPY package*.json ./

# COPY . .

# RUN npm install

# EXPOSE 4000

# CMD ["npm", "run", "dev"]

############## LAST VERSION ############
# FROM node:20.11.1

# WORKDIR /app

# COPY package*.json ./
# COPY src ./src
# COPY public ./public
# COPY next.config.js .
# COPY tsconfig.json .

# RUN npm ci --cache .npm --cpu=x64 --os=linux sharp
# RUN npm run build

# ENV PORT=3000
# EXPOSE 3000

# CMD ["npm", "run", "start"]

# // **
# Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# // **
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# ENV PORT=3000
# EXPOSE 3000