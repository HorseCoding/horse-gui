# builds the website
cd ..
npm i -g pnpm@v6
pnpm i --shamefully-hoist
npm i -g cross-env
cross-env NODE_OPTIONS=--openssl-legacy-provider NODE_ENV=production webpack --bail