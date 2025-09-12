npm -v

RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

function rm_file() {
  target=$1
  if [ -f "$target" ]; then
    rm $target
    echo -e "${RED}Remove${NC} ${BLUE}$target${NC}"
  fi
}
function rm_directorie() {
  target=$1
  if [ -d $target ]; then
    rm -r $target
    echo -e "${RED}Remove${NC} ${BLUE}$target${NC}"
  fi
}


function reinstall() {
  path=$1
  rm_directorie ${path}/node_modules
  rm_file ${path}/package-lock.json
  rm_file ${path}/yarn-lock.json
  rm_file ${path}/pnpm-lock.yaml
}

root=$(pwd)

reinstall $root

for dir in $root/apps/* ; do
  [ -L "${dir}" ] && continue
  reinstall $dir
done
for dir in $root/modules/* ; do
  [ -L "${dir}" ] && continue
  reinstall $dir
done
for dir in $root/packages/* ; do
  [ -L "${dir}" ] && continue
  reinstall $dir
done

pnpm install