PKG_LIST="builder-base,rollup-plugin-svgr,anatomy,react"
IFS=',' read -ra PKGS <<< "$PKG_LIST"
for pkg in "${PKGS[@]}"; do
  pnpm --filter "$pkg" build -w &
done
wait