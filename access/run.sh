#!/bin/sh

if ! [ -e "boreas.db" ] ; then
	touch boreas.db
fi

python3 access.py

