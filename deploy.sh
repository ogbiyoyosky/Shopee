cd shopee

echo "Pulling from stagging" 

git pull origin stagging

echo "Pulled successfully from stagging"

echo "nmp installing"

npm install

echo "running migration"

adonis migration:run --force

echo "Restarting server..."

pm2 start server.js -f

echo "Server restarted Successfully"
