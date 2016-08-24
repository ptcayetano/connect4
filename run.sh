#!/bin/bash
ENV=$1
echo Building environment for $ENV
gulp $ENV
node app.js