FROM node


COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src/server.js server.js

RUN npm install

ENTRYPOINT [ "node", "src/server.js" ]