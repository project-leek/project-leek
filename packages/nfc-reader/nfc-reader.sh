#! /bin/sh

docker pull anbraten/project-leek-nfc-reader:latest

docker run -ti \
  --name nfc-reader \
  -e NFC_READER_ID=BU62UGHufeLvF763 \
  -e API_URL=http://192.168.0.182:3030 \
  -v /dev/input:/dev/input \
  -v /run/udev/data:/run/udev/data \
  --device /dev/input/by-id/usb-413d_2107-event-kbd \
  anbraten/project-leek-nfc-reader
