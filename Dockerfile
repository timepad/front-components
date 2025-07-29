FROM cr.yandex/crpt7n2li2drrrf292dl/node:12.16.3-buster-slim AS deps
WORKDIR /front-components

# Переключаем buster на архивные репы и ставим git/ssh/ca-certs
RUN sed -i 's|deb.debian.org/debian|archive.debian.org/debian|g; \
            s|security.debian.org/debian-security|archive.debian.org/debian-security|g' /etc/apt/sources.list \
 && apt-get -o Acquire::Check-Valid-Until=false update \
 && apt-get install --no-install-recommends -y git openssh-client ca-certificates \
 && rm -rf /var/lib/apt/lists/*

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
