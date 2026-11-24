FROM node:24-alpine

ENV PORT=8080
WORKDIR /app

RUN npm install -g pnpm@12.14.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src

ARG COMMIT_HASH=unknown
ENV COMMIT_HASH=$COMMIT_HASH

EXPOSE 8080
CMD ["pnpm", "start"]
