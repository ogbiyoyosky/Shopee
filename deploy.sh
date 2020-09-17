cd shopee

echo "Pulling from stagging" 

git pull origin dev

echo "Pulled successfully from stagging"

echo "npm installing"

npm install

echo "running migration"

adonis migration:run --force

echo "Restarting server..."

pm2 restart server.js -f

echo "Server restarted Successfully"
