#!/bin/bash

for file in public/media/*
do
    output="${file%.*}.webp"
    if [ ! -f "$output" ]
    then
        cwebp "$file" -o "$output"
    fi
done
