#!/bin/sh
# current directory is GAE app root directory
EMAIL=

git branch | egrep '\* release' -q || exit 1

sed -i 's/debug=True/debug=False/' dispatch.py

appcfg.py -e $EMAIL update .

git checkout dispatch.py
