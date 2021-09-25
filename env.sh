#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js

# Read each line in .env file and current environment
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi
  
  # Append configuration property to JS file
  [[ $varname = REACT_APP_* ]] && echo "  $varname: \"$varvalue\"," >> ./env-config.js

# This reads from both .env and current environment. If a variable exists in
# both the current environment will be written last so will take precedence.
done < <(cat .env <(env) 2>/dev/null)

echo "}" >> ./env-config.js
