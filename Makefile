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

.PHONY: build_set_index
build_set_index:
	@npx rimraf sets/index.*
	@node -e 'fs.writeFileSync("sets/index.txt", fs.readdirSync("sets").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/index.json", JSON.stringify(fs.readFileSync("sets/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: build_types
build_types:
	@npx rimraf src/types.ts
	@node scripts/build_types.js
