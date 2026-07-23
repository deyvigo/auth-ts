# build stage
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN CI=true pnpm build

# production stage
FROM node:24-alpine AS production
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.9 --activate

COPY package.json pnpm-lock.yaml ./
COPY .env ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/tsconfig.json ./

EXPOSE 3000
CMD ["pnpm", "start"]