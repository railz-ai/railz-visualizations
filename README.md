<h1 align="center">
  <a href="https://docs.railz.ai/reference/visualization-sdk">
    Railz Visualizations
  </a>
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@railzai/railz-visualizations"><img src="https://img.shields.io/npm/v/@railzai/railz-visualizations" alt="Latest Version on NPM"/></a>
  <a href="https://github.com/railz-ai/railz-visualizations/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@railzai/railz-visualizations" alt="Software License"/></a>
  <img src="https://badgen.net/bundlephobia/dependency-count/@railzai/railz-visualizations@latest" alt="Tree shaking"/>
  <img src="https://badgen.net/bundlephobia/tree-shaking/@railzai/railz-visualizations@latest" alt="Tree shaking"/>
</p>
<h2 align="center">Powerful charting components built with <a href="https://stenciljs.com" target="_blank">StencilJS</a> and <a href="https://www.highcharts.com/" target="_blank">Highcharts</a> based on <a href="https://railz.ai" target="_blank">Railz.ai</a> dashboard.</h2>

<p align="center">
  <a href="https://docs.railz.ai/reference/visualization-sdk">Demo and API</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#basic-usage">How To Use</a> •
  <a href="#installation">Installation</a> •
  <a href="https://github.com/railz-ai/railz-visualizations/tree/master/packages/components/src/components/core/readme.md">Docs</a> •
  <a href="#license">License</a>
</p>

<img src="https://railz.ai/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F124388%2F2336x2080%2F62bed08777%2Frailz-data-financial-institutions.png&w=2560&q=80" alt="Railz dashboard preview" width="100%" />
<i>Railz Dashboard.</i>
<br>

## Key Features

- Charting components built for financial data and reports.
- Mobile responsive components;
- Customizations:
    - Update colors based on your branding;
    - Change text content and styles;
- Components
  - Visualization Controls - this is used to display status of bills and invoices
  - Statement Visualizations - this is used to display financial statements like Income Statements, Cashflow Statements, Balance Sheets.

  
## Overview

The Railz Visualization components helps to build your dashboard easily with data from the Railz Reports API.
<br>

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Latest ✔                                                                                 | Latest ✔                                                                                    | Latest ✔                                                                                 | Latest ✔                                                                              | Latest ✔                                                                           |

## Installation

The library is published as a [scoped NPM package](https://docs.npmjs.com/misc/scope) in the [NPMJS Railz account](https://www.npmjs.com/org/railzai).

[Check our docs on detailed instruction guide](https://docs.railz.ai/reference/getting-started).

With NPM:

```bash
npm install @railzai/railz-visualizations
```

With Yarn:

```bash
yarn add @railzai/railz-visualizations
```

## Framework
- [Angular](https://docs.railz.ai/reference/getting-started#angular);
- [React](https://docs.railz.ai/reference/getting-started#react);

## Visualizations Usage

All you have to do just to import the core component on the page and pass its parameters to access the access it properties as an element.
We provide many ways to integrate our grid in your project:

- [Import grid to your index.html file](./docs/indexhtml.md);
- [Import as module with lazy loading](./docs/indexmodule.md);
- [Import inside builders like webpack using lazy loading module](./docs/webpack.md);
- [Import as esm module without lazy loading](./docs/custom.element.md);

### Framework usage React example

```react
import React, {useEffect, useState} from 'react';
import './App.css';
import {RailzVisualizations} from "@railzai/railz-visualizations-react";
import {RVAccountingProviders, RVReportFrequency, RVReportTypes} from "@railzai/railz-visualizations";

function App() {
  const [token, setToken] = useState('');
  
  useEffect( () => {
    const { token }: { token: string } = {token: '12222'};
    setToken(token);
  }, []);
  return (
    <div className="App">
      <RailzVisualizations configuration={{token: ''}} filter={{
        businessName: "testFreshbooks",
        serviceName: RVAccountingProviders.FRESHBOOKS,
        reportType: RVReportTypes.BILLS,
        startDate: "2021-01-01",
        endDate: "2022-01-28",
        reportFrequency: RVReportFrequency.MONTH,
      }}/>
    </div>
  );
}

export default App;
```

### Framework usage Angular example

#### app.component.html
```angular
<railz-visualizations
  [configuration]='token'
  [filter]='filter'
>
</railz-visualizations>
```
#### app.module.ts
Import the `RailzVisualizationsModule` into your component module or app.module.ts file
```angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/src/lib/railz-visualizations.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RailzVisualizationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```


## Local Development -  Should be removed before publishing
### Link Your Packages (Optional)

To build and test your components locally, you will need to link the packages together. This is a replacement for publishing packages to npm that allows you to develop and test locally. 

To do this, we’ll use the npm link command.

First, build the **packages/components** library and create a symlink to the library.

```bash
npm run build
npm link
```

#### For React
With the symlink created, the React component library will need to consume the stencil component library.
Go to `packages/components-react` folder and run the below:

```bash
npm link @railzai/railz-visualizations
```
And with that, the react component library is linked to the stencil component library are linked together.

In your react component library, you need to create its own symlink.
```bash
npm run build
npm link
```

#### Usage
In your own React Application, you can run the below to link both libraries
```bash
npm link @railzai/railz-visualizations-react
```

To make use of the React component library in your React application, import the components from the React component library in the file where you want to use them.

```typescript jsx
import { RailzVisualizations } from '@railzai/railz-visualizations-react';
```

#### For Angular
With the symlink created, the Angular component library will need to consume the stencil component library.
Go to `packages/components-angular` folder and run the below:

```bash
npm link @railzai/railz-visualizations
```
And with that, the angular component library is linked to the stencil component library are linked together.

In your angular component library, you need to create its own symlink.
```bash
npm run build
npm link
```

#### Usage
In your own Angular Application, you can run the below to link both libraries
```bash
npm link @railzai/railz-visualizations-angular
```

To make use of the Angular component library in your Angular application, set up your module file to import the visualizations module.

```typescript
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/src";
```



## Contributing
The Railz Visualization library and documentation are open to contributions. For more information, check the [guidelines](https://docs.railz.ai/reference/contributing).

## License

MIT

---