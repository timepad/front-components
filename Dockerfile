FROM node:22-alpine AS deps
WORKDIR /front-components

# Аналог apt-пакетов для Alpine + тулчейн для возможных native deps
RUN apk add --no-cache \
    git \
    openssh-client \
    ca-certificates

# Подсказываем npm предпочесть prebuilt и меньше сюрпризов
ENV CI=true \
    npm_config_build_from_source=false \
    PUPPETEER_SKIP_DOWNLOAD=true

# Копируем package-файлы и ставим все зависимости
COPY package.json package-lock.json* ./
RUN REPO=$(grep '"front-shared"' package.json | awk -F\" '{print $4}') \
 && npm install "git+${REPO}" --no-save \
 && sed -i '/"front-shared"/d' package.json \
 && npm install --legacy-peer-deps

# Копируем исходный код и собираем статику
COPY . .
# создаем статику в ./dist/storybook
RUN npm run build-storybook

# Используем легковесный образ Nginx
FROM cr.yandex/crpt7n2li2drrrf292dl/nginx:stable

# Копируем ТОЛЬКО собранные файлы из первого этапа (builder) в директорию Nginx
COPY --from=deps /front-components/dist/storybook /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# открываем порт
EXPOSE 6006
