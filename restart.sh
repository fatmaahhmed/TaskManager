#!/bin/sh
pkill -f node
npm run build
node dist/index.js