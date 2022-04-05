FROM node:16 AS react-app
WORKDIR /jumia-exercise-fe
ENV PATH = "./node_modules/.bin:$PATH"
COPY . .
RUN npm install
CMD ["npm", "start"]

