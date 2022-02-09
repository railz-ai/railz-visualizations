# railz-visualizations

Web Component sdk to use/display charts from Railz.ai

## What is this repository for?

- ## `web-component`
  - Holds the SDK component as Web Component built using [StencilJS](https://stenciljs.com/).
- ## `examples/angular`
  - The proof-of-concept on how to run the `web-component` on Angular with examples to see how to use.
- ## `examples/react`
  - The proof-of-concept on how to run the `web-component` on React with examples to see how to use.

---

### Development Configuration

#### First config

- Just clone `web-dashboard` on the same folder as `railz-visualizations` and on `web-component` just add on `package.json` this dependency:

```
"railz-visualizations": "file:../railz-visualizations/web-component",
```

#### Updating

- After code change on `railz-visualizations` you need to run this so it can reflect on `web-dashboard`

```
cd web-component
yarn build
yarn link
```

- Now you can go to `web-dashboard` and run

```
yarn link "railz-visualizations"
```

---

## How to run

### web-component

```
cd web-component
yarn
yarn start // will start on port 3333
```

### examples/react

If you want to run the examples you need to go on `web-component` folder and do a `yarn build`. So it can build the correct `/dist` folder.

```
cd examples/react
yarn
yarn start // will start on port 3666
```

### examples/angular

If you want to run the examples you need to go on `web-component` folder and do a `yarn build`. So it can build the correct `/dist` folder.

```
cd examples/angular
yarn
yarn start // will start on port 4200
```

---

## How to publish a new version?

1. Update dependencies with `yarn`
2. Login with: `npm login` (using credentials from last pass)
3. Bump version with: `npm version (major | minor | patch)`
   - More info here: [Updating your published package version number](https://docs.npmjs.com/updating-your-published-package-version-number)
4. Now just `yarn build`
5. Now just `npm publish`
