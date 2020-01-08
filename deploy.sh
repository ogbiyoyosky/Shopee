cd shopee

echo "Pulling from stagging" 

git pull origin stagging

echo "Pulled successfully from stagging"

echo "npm installing"

npm install

echo "running migration"

adonis migration:refresh --force

echo "seeding database"

adonis seed --force

echo "Restarting server..."

pm2 start server.js -f

echo "Server restarted Successfully"
