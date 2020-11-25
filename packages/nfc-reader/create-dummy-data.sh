#! /bin/sh

curl -H "Content-Type: application/json" -X POST -d '{"nfcId":"2589851589","audioUrl":"rickroll.wav"}' http://localhost:3030/api/v1/nfc-tags
curl -H "Content-Type: application/json" -X POST -d '{}' http://localhost:3030/api/v1/nfc-readers