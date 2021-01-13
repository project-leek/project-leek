#! /bin/sh

NFC_READER_ID="BU62UGHufeLvF763"
NFC_TAG_DATA=$1
# NFC_TAG_DATA="2589689541"
API_URL="http://localhost:3030"
# API_URL="http://192.168.0.182:3030"

curl -H "Content-Type: application/json" -X PATCH -d '{"attachedTagData": "'$NFC_TAG_DATA'"}' "$API_URL/nfc-readers/$NFC_READER_ID"
sleep 3
curl -H "Content-Type: application/json" -X PATCH -d '{"attachedTagData": null}' "$API_URL/nfc-readers/$NFC_READER_ID"
