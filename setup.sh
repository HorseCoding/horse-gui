echo "Setting up Espresso."

npm i -g pnpm

pnpm i --shamefully-hoist

NODE_OPTIONS=--openssl-legacy-provider pnpm start