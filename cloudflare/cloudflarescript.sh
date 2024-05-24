# builds the website
cd ..
npm i -g pnpm@v6
pnpm i --shamefully-hoist
npm install -D webpack-cli
NODE_OPTIONS=--openssl-legacy-provider NODE_ENV=production npx webpack --bail