# Getting Started with Node.js Example App

This project is a sample Node.js application that authenticates using your client id and secret generated from the Railz Dashboard.
See details about getting your access [here](https://docs.railz.ai/reference/authentication).

## Usage
1. Clone the example using the below commands.
```bash
git clone https://github.com/railz-ai/railz-visualizations

cd railz-visualizations/examples/nodejs
```
2. Set your environment variable by copying `.env.example` -> `.env`
```bash
cp .env.example .env
```
3. Set the values based on your authentication details
```dotenv
AUTH_URL=
CLIENT_ID=
CLIENT_SECRET=
```
4. Start the Node.js server
```bash
yarn install

yarn start
```
5. You should be able to access the Node.js server at `http://localhost:4000`. Authentication URL is `http://localhost:4000/authenticate`