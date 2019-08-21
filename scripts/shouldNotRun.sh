#!/bin/bash -e

watch=${PWD##*/}

if grep -Fxq $watch ../changed_folders 
then 
  exit 1;
else
  exit 0;
fi