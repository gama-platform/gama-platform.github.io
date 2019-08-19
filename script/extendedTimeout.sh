##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

#!/bin/sh

# send the long living command to background
yarn run publish-gh-pages &

# Constants
RED='\033[0;31m'
minutes=0
limit=3

while kill -0 $! >/dev/null 2>&1; do
  echo -n -e " \b" # never leave evidences!

  if [ $minutes == $limit ]; then
    echo -e "\n"
    echo -e "${RED}Test has reached a ${minutes} minutes timeout limit"
    exit 1
  fi

  minutes=$((minutes+1))

  # Sleep 500 seconds ~ 10 minutes
  sleep 500
done

exit 0

