FROM node:24-alpine as build

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:24-alpine as production
WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]