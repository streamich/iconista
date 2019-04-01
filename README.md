# iconista

- [__Pick an icon!__](https://49-175650538-gh.circle-artifacts.com/0/root/repo/storybook-static/index.html)
- Hundreds 💯+ of SVG icons in one React component
- Just [one 50-line React component](https://github.com/streamich/iconista/blob/master/src/index.tsx)
- [TypeScript autocompletion](./docs/icon.gif) for icon sets and icons
- Inlines icons as SVG elements, so you can apply CSS styling to them
- All icons are responsive (SVG `widht` and `height` attributes are removed)
- `fill` SVG properties are not set, so you can color icons with CSS


![image](https://user-images.githubusercontent.com/9773803/55281453-d8aafc80-5334-11e9-88b2-b275e41c9ec6.png)


React usage:

```js
import Svg from 'iconista';

<Svg set='ibm_16' icon='arrow--down' />
```

Or, simply get the icon URL:

```js
import {getUrl} from 'iconista/lib/getUrl';

const url = getUrl({set: 'ibm_16', icon: 'arrow--down'});
```


## License

- `elastic` icon set is under [Apache License 2.0 by Elastic](https://github.com/elastic/eui/blob/master/LICENSE)
- `ibm_16` and `ibm_32` icon sets are under [Apache License 2.0 by IBM](https://github.com/IBM/carbon-elements/blob/master/LICENSE)
- `atlaskit` icon set is under [Apache License 2.0 by Atlassian](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/LICENSE)
- `ant_fill`, `ant_outline`, and `ant_twotone` icon sets are under [MIT license](https://github.com/ant-design/ant-design-icons/blob/c09692d385d37ceee509e48fbe502051251f2e87/packages/icons/package.json#L17)
- `auth0` icon set is under [MIT license by Auth0](https://github.com/auth0/cosmos/blob/b37531ae3ade2752ec041c532c90ed03e140143e/LICENSE)
- `fontawesome_regular` and `fontawesome_solid` icon sets are under [CC BY 4.0 License](https://github.com/FortAwesome/Font-Awesome/blob/1975bba5c4ade236c02bf2e5f9551160ee85109d/LICENSE.txt#L8)
- `fontawesome_brands` icons set [contains trademarks of respective brands](https://github.com/FortAwesome/Font-Awesome/blob/1975bba5c4ade236c02bf2e5f9551160ee85109d/LICENSE.txt#L30)
- This project is under [Unlicense](LICENSE) license &mdash; public domain.
