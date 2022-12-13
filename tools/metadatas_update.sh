#!/bin/bash

# Assign the filename
filename="collection/metadatas/*.json"

# Take the search string
search=IPFS_URI

# Take the replace string
replace=QmQNc6kQu3GoVAVsJaFysuiYajySYMU5pSPtnDYo1fNudg


find ./collection/metadatas/ -name '*.json' -exec sed -i -e "s/$search/$replace/g" {} \;
rm -rf ./collection/metadatas/*.json-e