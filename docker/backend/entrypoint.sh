#! /bin/sh

# skip ngrok
if [ -n "$BE_FREE" ]; then
  node index.js
  exit 0
fi

# use ngrok and use auto-generated hostname for backend
if [ -z "$NGROK_AUTH" ]; then
  echo "Please set NGROK_AUTH to your ngrok auth token."
  echo "You can get it from: https://dashboard.ngrok.com/get-started/setup"
  exit -1
fi

echo "Starting ngrok ..."
/bin/ngrok http backend:3030 --authtoken $NGROK_AUTH --bind-tls true --log stdout --log-level "error" --region eu &

sleep .7 # Wait for ngrok launch

export NGROK_HOSTNAME=$(echo -e 'GET /api/tunnels HTTP/1.1\nHost: 127.0.0.1\n' | nc localhost 4040 | sed -nE 's/.*public_url":"https:..([^"]*).*/\1/p')
export PROXY_URL="https://$NGROK_HOSTNAME"
export HOSTNAME=$NGROK_HOSTNAME

echo "Please check your spotify oauth settings for the correct callback address:"
echo "$PROXY_URL/oauth/spotify/callback"

node index.js
