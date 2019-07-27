#!/bin/sh

set -e

# eval $(ssh-agent -s)
# echo -e "StrictHostKeyChecking no" >> /etc/ssh/ssh_config
# mkdir -p ~/.ssh
# printf "$GH_SSH_KEY" > ~/.ssh/id_rsa
# chmod 600 ~/.ssh/id_rsa
# ssh-add ~/.ssh/id_rsa
# ssh-add -l

npm ci
sh -c "$*"
