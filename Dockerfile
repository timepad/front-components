FROM node:22-alpine AS deps
RUN apk update \
    && apk add --no-cache \
    git \
    openssh-client \
    ca-certificates

WORKDIR /front-components

COPY . .

#install fonts 
RUN REPO=$(cat package.json| grep front-shared | awk '{print $2}' | sed 's/,//g' | sed 's/"//g') && \
    echo $REPO && \
    npm install git+$REPO && \
    cat package.json | sed '/front-shared/d' > tmpfile && mv tmpfile package.json

RUN npm install --legacy-peer-deps
RUN BROWSER=none npm run storybook build -- -o ./dist/storybook

CMD npm run storybook