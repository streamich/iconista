# iconista

- Hundreds 💯+ of SVG icons in one React component. [Go to Storybook][storybook]
- One React component
- [TypeScript autocompletion](./docs/icon.gif) for icon sets and icons
- Inlines icons as SVG elements, so you can apply CSS styling to them
- All icons are responsive (SVG `widht` and `height` attributes are removed)
- `fill` SVG properties are not set, so you can color icons with CSS


[![image](https://user-images.githubusercontent.com/9773803/55281453-d8aafc80-5334-11e9-88b2-b275e41c9ec6.png)][storybook]

[storybook]: https://streamich.github.io/iconista

React usage

```js
import Svg from 'iconista';

<Svg set='ibm_16' icon='arrow--down' />
```

Or, simply get the icon URL:

```js
import {getUrl} from 'iconista/lib/getUrl'

const url = getUrl({set: 'ibm_16', icon: 'arrow--down'})
```


## License

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
- This project is under [Unlicense](LICENSE) license &mdash; public domain.
