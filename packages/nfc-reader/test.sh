#! /bin/sh

docker run --rm \
  -e NFC_READER_ID=test \
  -e API_URL=http://localhost:3000 \
  -v /dev/input/by-id:/dev/input/by-id \
  anbraten/project-leek-nfc-reader:0.0.1
