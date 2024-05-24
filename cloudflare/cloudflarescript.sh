# builds the website
cd ..
npm i -g pnpm@v6
pnpm i --shamefully-hoist
npm install -g webpack-cli
NODE_OPTIONS=--openssl-legacy-provider NODE_ENV=production pnpm dlx webpack -y --bail