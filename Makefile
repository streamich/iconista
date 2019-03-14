.PHONY: ibm_16
ibm_16:
	@npx rimraf tmp/ibm_16 sets/ibm_16
	@npx mkdirp tmp/ibm_16 sets/ibm_16
	@cp node_modules/@carbon/icons/svg/16/* tmp/ibm_16/
	@npx svgo tmp/ibm_16/*.svg
	@cp tmp/ibm_16/* sets/ibm_16/
	@node -e 'fs.writeFileSync("sets/ibm_16/index.txt", fs.readdirSync("sets/ibm_16").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/ibm_16/index.json", JSON.stringify(fs.readFileSync("sets/ibm_16/index.txt", "utf8").split("\n"), null, 2))'

.PHONY: build_set_index
build_set_index:
	@npx rimraf sets/index.*
	@node -e 'fs.writeFileSync("sets/index.txt", fs.readdirSync("sets").map(n => path.parse(n).name).join("\n"))'
	@node -e 'fs.writeFileSync("sets/index.json", JSON.stringify(fs.readFileSync("sets/index.txt", "utf8").split("\n"), null, 2))'
