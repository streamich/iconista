# iconista

- Thousands of SVG icons. [See to Storybook][storybook].
- Just one React component.
- Icons are lazy-loaded, so you only load the icons you use.
- [TypeScript autocompletion](./docs/icon.gif) for icon sets and icons.
- Inline icons as SVG elements, so you can apply CSS styling to them.
- All icons are responsive (SVG `widht` and `height` attributes are removed).
- `fill` SVG properties are not set, so you can color icons with CSS.
- SVG icons are optimized with SVGO.


![autocomplete](https://github.com/streamich/iconista/blob/master/docs/icon.gif)

[storybook]: https://streamich.github.io/iconista


## React usage

```js
import Svg from 'iconista';

<Svg set='ibm_16' icon='arrow--down' />
```

Or, simply get the icon URL:

```js
import {getUrl} from 'iconista/lib/getUrl'

const url = getUrl({set: 'ibm_16', icon: 'arrow--down'})
```


## Static usage

You can access icons directly from a public CDN, using icon's `{set}` and
`{icon}` identifiers. For example, you can use the JsDelivr CDN:

Using [JsDelivr](https://cdn.jsdelivr.net/npm/iconista@2/sets/lucide/beef.svg):

```
https://cdn.jsdelivr.net/npm/iconista@2/sets/{set}/{icon}.svg
```

Using [UNPKG](https://unpkg.com/iconista@2/sets/lucide/beef.svg):

```
https://unpkg.com/iconista@2/sets/{set}/{icon}.svg
```

Using [ESM.sh](https://esm.sh/iconista@2.18.0/sets/lucide/beef.svg):

```
https://esm.sh/iconista@2/sets/{set}/{icon}.svg
```


## License

All icon sets and this repository are distributed under permissive open-source
licenses:

- `elastic` icon set is under [Apache License 2.0 by Elastic](https://github.com/elastic/eui/blob/master/LICENSE).
- `ibm_16` and `ibm_32` icon sets are under [Apache License 2.0 by IBM](https://github.com/IBM/carbon-elements/blob/master/LICENSE).
- `atlaskit` icon set is under [Apache License 2.0 by Atlassian](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/LICENSE).
- `ant_fill`, `ant_outline`, and `ant_twotone` icon sets are under [MIT license](https://github.com/ant-design/ant-design-icons/blob/c09692d385d37ceee509e48fbe502051251f2e87/packages/icons/package.json#L17).
- `auth0` icon set is under [MIT license by Auth0](https://github.com/auth0/cosmos/blob/b37531ae3ade2752ec041c532c90ed03e140143e/LICENSE).
- `fontawesome_regular` and `fontawesome_solid` icon sets are under [CC BY 4.0 License](https://github.com/FortAwesome/Font-Awesome/blob/1975bba5c4ade236c02bf2e5f9551160ee85109d/LICENSE.txt#L8).
- `fontawesome_brands` icons set [contains trademarks of respective brands](https://github.com/FortAwesome/Font-Awesome/blob/1975bba5c4ade236c02bf2e5f9551160ee85109d/LICENSE.txt#L30).
- `pluralsight` and `pluralsight_illustrations` icon sets are under [Apache License 2.0 by Pluralsight](https://github.com/pluralsight/design-system/blob/f6e81d360336df88764a517440003355c07f761a/LICENSE).
- `emojione_v2` icon set is under [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).
- `radix` icon set is under [MIT license by WorkOS](https://github.com/radix-ui/icons/blob/237cd76c007a573c2a6f6caabe9ea3de81393f50/LICENSE).
- `lucide` icon set is under [ISC and MIT licenses](https://github.com/lucide-icons/lucide/blob/1eee03451a5447069aceaaafbb1967fc78670bf8/LICENSE).
- `lineicons` icon set is under [MIT licenses](https://github.com/LineiconsHQ/Lineicons/blob/2630a45a259164dea83497d6dfeb9050c054fc22/LICENSE.md).
- `tabler` and `tabler_filled` icon sets are under [MIT license](https://github.com/tabler/tabler-icons/blob/e54656d27e9682d61482626bf9f4d093928b7c95/LICENSE).
- `simple` icon set is under [CC0 1.0 Universal license](https://github.com/simple-icons/simple-icons/blob/ac87321562995f2e55272ac06b5e68308edb6c0b/LICENSE.md).
- `vscode` and `vscode_dark` icon sets are under [CC Attribution 4.0 International](https://github.com/microsoft/vscode-icons/blob/2ca0f3225c1ecd16537107f60f109317fcfc3eb0/LICENSE).
- `bootstrap` icon set is under [MIT license](https://github.com/twbs/icons/blob/dfc7bdc1bf536ac631ec12c8592e4d7bcd1d0ee9/LICENSE).
- This project is under [Unlicense](LICENSE) license &mdash; public domain.
