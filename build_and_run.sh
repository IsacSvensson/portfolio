#!/bin/bash

cd client
npm run build
cd ..
python3 wsgi.py