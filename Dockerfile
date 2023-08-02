FROM node:14

ENV PORT 8081
ENV OPENAI_API_KEY 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
ENV NODE_ENV production

WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# RUN npm install
# run this for production
RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
