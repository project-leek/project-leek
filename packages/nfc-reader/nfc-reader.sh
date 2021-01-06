#! /bin/sh

NFC_READER_ID="BU62UGHufeLvF763"
API_URL="http://192.168.0.182:3030"

docker pull anbraten/leek-nfc-reader:latest

docker run -d \
  --name nfc-reader \
  -e NFC_READER_ID=$NFC_READER_ID \
  -e API_URL=$API_URL \
  -v /dev/input:/dev/input \
  -v /run/udev/data:/run/udev/data \
  --device /dev/input/by-id/usb-413d_2107-event-kbd \
  anbraten/leek-nfc-reader

docker logs -f nfc-reader
