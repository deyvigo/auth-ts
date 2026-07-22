// build stage
FROM node:24-alpine as build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

RUN pnpm prune --prod

// production stage
FROM node:24-alpine as production
WORKDIR /app

COPY package.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/index.js"]