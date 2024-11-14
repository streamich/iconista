.PHONY: ibm_16
ibm_16:
	@npx rimraf tmp/ibm_16 sets/ibm_16
	@npx mkdirp tmp/ibm_16 sets/ibm_16
	@find node_modules/@carbon/icons/svg/16 -maxdepth 1 -type f | xargs -I {} cp {} tmp/ibm_16
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/ibm_16/*.svg
	@cp tmp/ibm_16/* sets/ibm_16
	@node -e 'fs.writeFileSync("sets/ibm_16/index.txt", fs.readdirSync("sets/ibm_16").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/ibm_16/index.json", JSON.stringify(fs.readFileSync("sets/ibm_16/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: ibm_32
ibm_32:
	@npx rimraf tmp/ibm_32 sets/ibm_32
	@npx mkdirp tmp/ibm_32 sets/ibm_32
	@find node_modules/@carbon/icons/svg/32 -maxdepth 1 -type f | xargs -I {} cp {} tmp/ibm_32
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/ibm_32/*.svg
	@cp tmp/ibm_32/* sets/ibm_32
	@node -e 'fs.writeFileSync("sets/ibm_32/index.txt", fs.readdirSync("sets/ibm_32").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/ibm_32/index.json", JSON.stringify(fs.readFileSync("sets/ibm_32/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: elastic
elastic:
	@npx rimraf tmp/elastic sets/elastic
	@npx mkdirp tmp/elastic sets/elastic
	@find node_modules/@elastic/eui/src/components/icon/assets -maxdepth 1 -type f | xargs -I {} cp {} tmp/elastic
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/elastic/*.svg
	@cp tmp/elastic/* sets/elastic
	@node -e 'fs.writeFileSync("sets/elastic/index.txt", fs.readdirSync("sets/elastic").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/elastic/index.json", JSON.stringify(fs.readFileSync("sets/elastic/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: atlaskit
atlaskit:
	@npx rimraf tmp/atlaskit sets/atlaskit
	@npx mkdirp tmp/atlaskit sets/atlaskit
	@find node_modules/@atlaskit/icon/svgs -maxdepth 1 -type f | xargs -I {} cp {} tmp/atlaskit
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/atlaskit/*.svg
	@cp tmp/atlaskit/* sets/atlaskit
	@node -e 'fs.writeFileSync("sets/atlaskit/index.txt", fs.readdirSync("sets/atlaskit").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/atlaskit/index.json", JSON.stringify(fs.readFileSync("sets/atlaskit/index.txt", "utf8").split("\n"), null, 2))'
	@node scripts/atlaskit_add_xmlns.js

.PHONY: ant_outline
ant_outline:
	@npx rimraf tmp/ant_outline sets/ant_outline
	@npx mkdirp tmp/ant_outline sets/ant_outline
	@find node_modules/@ant-design/icons/svg/outline -maxdepth 1 -type f | xargs -I {} cp {} tmp/ant_outline
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/ant_outline/*.svg
	@cp tmp/ant_outline/* sets/ant_outline
	@node -e 'fs.writeFileSync("sets/ant_outline/index.txt", fs.readdirSync("sets/ant_outline").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/ant_outline/index.json", JSON.stringify(fs.readFileSync("sets/ant_outline/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: ant_fill
ant_fill:
	@npx rimraf tmp/ant_fill sets/ant_fill
	@npx mkdirp tmp/ant_fill sets/ant_fill
	@find node_modules/@ant-design/icons/svg/fill -maxdepth 1 -type f | xargs -I {} cp {} tmp/ant_fill
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/ant_fill/*.svg
	@cp tmp/ant_fill/* sets/ant_fill
	@node -e 'fs.writeFileSync("sets/ant_fill/index.txt", fs.readdirSync("sets/ant_fill").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/ant_fill/index.json", JSON.stringify(fs.readFileSync("sets/ant_fill/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: ant_twotone
ant_twotone:
	@npx rimraf tmp/ant_twotone sets/ant_twotone
	@npx mkdirp tmp/ant_twotone sets/ant_twotone
	@find node_modules/@ant-design/icons/svg/twotone -maxdepth 1 -type f | xargs -I {} cp {} tmp/ant_twotone
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/ant_twotone/*.svg
	@cp tmp/ant_twotone/* sets/ant_twotone
	@node -e 'fs.writeFileSync("sets/ant_twotone/index.txt", fs.readdirSync("sets/ant_twotone").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/ant_twotone/index.json", JSON.stringify(fs.readFileSync("sets/ant_twotone/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: auth0
auth0:
	@npx rimraf tmp/auth0 sets/auth0
	@npx mkdirp tmp/auth0 sets/auth0
	@find raw/auth0 -maxdepth 1 -type f | xargs -I {} cp {} tmp/auth0
	@node -e 'fs.readdirSync("tmp/auth0").forEach(n => fs.renameSync("tmp/auth0/" + n, "tmp/auth0/" + n.substr(5)))'
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/auth0/*.svg
	@cp tmp/auth0/* sets/auth0
	@node -e 'fs.writeFileSync("sets/auth0/index.txt", fs.readdirSync("sets/auth0").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/auth0/index.json", JSON.stringify(fs.readFileSync("sets/auth0/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: fontawesome_brands
fontawesome_brands:
	@npx rimraf tmp/fontawesome_brands sets/fontawesome_brands
	@npx mkdirp tmp/fontawesome_brands sets/fontawesome_brands
	@find raw/fontawesome_brands -maxdepth 1 -type f | xargs -I {} cp {} tmp/fontawesome_brands
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/fontawesome_brands/*.svg
	@cp tmp/fontawesome_brands/* sets/fontawesome_brands
	@node -e 'fs.writeFileSync("sets/fontawesome_brands/index.txt", fs.readdirSync("sets/fontawesome_brands").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/fontawesome_brands/index.json", JSON.stringify(fs.readFileSync("sets/fontawesome_brands/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: fontawesome_regular
fontawesome_regular:
	@npx rimraf tmp/fontawesome_regular sets/fontawesome_regular
	@npx mkdirp tmp/fontawesome_regular sets/fontawesome_regular
	@find raw/fontawesome_regular -maxdepth 1 -type f | xargs -I {} cp {} tmp/fontawesome_regular
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/fontawesome_regular/*.svg
	@cp tmp/fontawesome_regular/* sets/fontawesome_regular
	@node -e 'fs.writeFileSync("sets/fontawesome_regular/index.txt", fs.readdirSync("sets/fontawesome_regular").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/fontawesome_regular/index.json", JSON.stringify(fs.readFileSync("sets/fontawesome_regular/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: fontawesome_solid
fontawesome_solid:
	@npx rimraf tmp/fontawesome_solid sets/fontawesome_solid
	@npx mkdirp tmp/fontawesome_solid sets/fontawesome_solid
	@find raw/fontawesome_solid -maxdepth 1 -type f | xargs -I {} cp {} tmp/fontawesome_solid
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/fontawesome_solid/*.svg
	@cp tmp/fontawesome_solid/* sets/fontawesome_solid
	@node -e 'fs.writeFileSync("sets/fontawesome_solid/index.txt", fs.readdirSync("sets/fontawesome_solid").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/fontawesome_solid/index.json", JSON.stringify(fs.readFileSync("sets/fontawesome_solid/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: pluralsight
pluralsight:
	@npx rimraf tmp/pluralsight sets/pluralsight
	@npx mkdirp tmp/pluralsight sets/pluralsight
	@find node_modules/@pluralsight/ps-design-system-icon/dist/svg -maxdepth 1 -type f | xargs -I {} cp {} tmp/pluralsight
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/pluralsight/*.svg
	@cp tmp/pluralsight/* sets/pluralsight
	@node -e 'fs.writeFileSync("sets/pluralsight/index.txt", fs.readdirSync("sets/pluralsight").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/pluralsight/index.json", JSON.stringify(fs.readFileSync("sets/pluralsight/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: pluralsight_illustrations
pluralsight_illustrations:
	@npx rimraf tmp/pluralsight_illustrations sets/pluralsight_illustrations
	@npx mkdirp tmp/pluralsight_illustrations sets/pluralsight_illustrations
	@find node_modules/@pluralsight/ps-design-system-emptystate/dist/svg -maxdepth 1 -type f | xargs -I {} cp {} tmp/pluralsight_illustrations
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/pluralsight_illustrations/*.svg
	@cp tmp/pluralsight_illustrations/* sets/pluralsight_illustrations
	@node -e 'fs.writeFileSync("sets/pluralsight_illustrations/index.txt", fs.readdirSync("sets/pluralsight_illustrations").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/pluralsight_illustrations/index.json", JSON.stringify(fs.readFileSync("sets/pluralsight_illustrations/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: emojione_v2
emojione_v2:
	@npx rimraf tmp/emojione_v2 sets/emojione_v2
	@npx mkdirp tmp/emojione_v2 sets/emojione_v2
	@find node_modules/emojione/assets/svg -maxdepth 1 -type f | xargs -I {} cp {} tmp/emojione_v2
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/emojione_v2/*.svg
	@cp tmp/emojione_v2/* sets/emojione_v2
	@node -e 'fs.writeFileSync("sets/emojione_v2/index.txt", fs.readdirSync("sets/emojione_v2").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/emojione_v2/index.json", JSON.stringify(fs.readFileSync("sets/emojione_v2/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: radix
radix:
	@npx rimraf tmp/radix sets/radix
	@npx mkdirp tmp/radix sets/radix
	@find raw/radix -maxdepth 1 -type f | xargs -I {} cp {} tmp/radix
	@npx svgo "--disable=removeViewBox" "--enable=removeDimensions" tmp/radix/*.svg
	@cp tmp/radix/* sets/radix
	@node -e 'fs.writeFileSync("sets/radix/index.txt", fs.readdirSync("sets/radix").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/radix/index.json", JSON.stringify(fs.readFileSync("sets/radix/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: build_set_index
build_set_index:
	@npx rimraf sets/index.*
	@node -e 'fs.writeFileSync("sets/index.txt", fs.readdirSync("sets").filter((path) => path[0] !== ".").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/index.json", JSON.stringify(fs.readFileSync("sets/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: build_types
build_types:
	@npx rimraf src/types.ts
	@node scripts/build_types.js
	@node scripts/build_stories.js
