<h1 align="center">
  <a href="https://docs.railz.ai/reference/visualization-sdk">
    Railz Visualizations
  </a>
</h1>

<p align="center">
  <img alt="Built With Stencil" src="https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square" alt="Latest Version on NPM"/></a>
  <a href="https://www.npmjs.com/package/@railzai/railz-visualizations"><img src="https://img.shields.io/npm/v/@railzai/railz-visualizations" alt="Latest Version on NPM"/></a>
  <a href="https://github.com/railz-ai/railz-visualizations/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@railzai/railz-visualizations" alt="Software License"/></a>
  <img src="https://badgen.net/bundlephobia/dependency-count/@railzai/railz-visualizations?v=1" alt="Tree shaking"/>
  <img src="https://badgen.net/bundlephobia/tree-shaking/@railzai/railz-visualizations?v=1" alt="Tree shaking"/>
  <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-black.svg?style=flat-square" alt="License MIT" />
  </a>
  <a href="https://stenciljs.com/docs/style-guide">
      <img src="https://img.shields.io/badge/code_style-stencil/stylelint/prettier-5851ff.svg?style=flat-square" alt="Code Style" />
  </a>
</p>
<h2 align="center">Powerful charting components built with <a href="https://stenciljs.com" target="_blank">StencilJS</a> and <a href="https://www.highcharts.com/" target="_blank">Highcharts</a> based on <a href="https://railz.ai" target="_blank">Railz.ai</a> dashboard.</h2>

<p align="center">
  <a href="https://docs.railz.ai/reference/visualization-sdk">Docs</a> •
  <a href="#key-features-of-railz-visualizations">Key Features</a> •
  <a href="#visualizations-usage">How To Use</a> •
  <a href="#installation">Installation</a> •
  <a href="./examples">Examples</a> •
  <a href="#license">License</a>
</p>

<img src="https://railz.ai/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F124388%2F2336x2080%2F62bed08777%2Frailz-data-financial-institutions.png&w=2560&q=80" alt="Railz dashboard preview" width="100%" />
<p align="center"><i>Railz Dashboard.</i></p>
<br>

## Why Stencil ?

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loadingText out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Key Features of Railz Visualizations

- Charting components built for financial data and reports.
- Mobile responsive components;
- Customizations:
  - Update colors based on your branding;
  - Change text content and styles;
- Components
  - Visualization Controls - this is used to display status of bills and invoices
  - Statement Visualizations - this is used to display financial statements like Income Statements, Cashflow Statements, Balance Sheets.
  - Loading Indicator Component
  - Error/Status Image component

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

All you have to do just to import the core component on the page and pass its parameters to access it properties as an element.

### Prerequisites

#### Authentication

Setup the process of receiving an access_token from the Railz Authentication API, see details [here](https://docs.railz.ai/reference/authentication)

#### Framework Specific Installation

- [Angular](https://docs.railz.ai/reference/getting-started#angular);
- [React](https://docs.railz.ai/reference/getting-started#react);

### Framework usage React example

```react
import React, {useEffect, useState} from 'react';
import './App.css';
import {RailzVisualizations} from "@railzai/railz-visualizations-react";
import {RVAccountingProviders, RVReportFrequency, RVReportTypes} from "@railzai/railz-visualizations";

function App() {
  const [configuration, setToken] = useState('');

  useEffect( () => {
    const { configuration }: { configuration: string } = {configuration: '12222'};
    setToken(configuration);
  }, []);
  return (
    <div className="App">
      <RailzVisualizations configuration={{configuration: 'token_1233'}} filter={{
        businessName: "testFreshbooks",
        serviceName: RVAccountingProviders.FRESHBOOKS,
        reportType: RVReportTypes.BALANCE_SHEET,
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
  [configuration]='{configuration: 'token_1233'}'
  [filter]='{
        businessName: "testFreshbooks",
        serviceName: RVAccountingProviders.FRESHBOOKS,
        reportType: RVReportTypes.BALANCE_SHEET,
        startDate: "2021-01-01",
        endDate: "2022-01-28",
        reportFrequency: RVReportFrequency.MONTH,
      }'
>
</railz-visualizations>
```

#### app.module.ts

Import the `RailzVisualizationsModule` into your component module or app.module.ts file

```angular
import { NgModule } from '@angular/core'; import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; import {RailzVisualizationsModule} from
"@railzai/railz-visualizations-angular/dist"; @NgModule({ declarations: [AppComponent], imports:
[BrowserModule, RailzVisualizationsModule], providers: [], bootstrap: [AppComponent], }) export
class AppModule {}
```

## Local Development

### Build Your Packages

To build and test your components locally, you will need to link the packages together. This is a replacement for publishing packages to npm that allows you to develop and test locally.
We are using [lerna](https://github.com/lerna/lerna) to do this for us

From the main folder:

1. Clone this repository
2. Install the dependency needed to setup the packages from the main folder.
   ```bash
   yarn
   ```
3. Install lerna using yarn
   ```bash
   yarn global add lerna
   ```
4. Run the bootstrap command to install all the dependencies for the packages, lerna will handle the linking between the packages
   ```bash
   yarn install:codesandbox
   ```
5. Build the packages to begin using
   ```bash
   yarn build
   ```
6. Create a symlink to the built **packages/components** library
   ```bash
   cd packages/components
   yarn link
   ```

#### For React

Lerna already linked the stencil component library to the React library during the build process so we only need to create the symlink for the React component library.
Go to `packages/components-react` folder and run the below:

```bash
yarn link
```

#### Usage

In your own React Application, you can run the below to link both libraries

```bash
yarn link @railzai/railz-visualizations
yarn link @railzai/railz-visualizations-react
```

To make use of the React component library in your React application, import the components from the React component library in the file where you want to use them.

```typescript jsx
import { RailzVisualizations } from '@railzai/railz-visualizations-react';
```

#### For Angular

Lerna already linked the stencil component library to the Angular library during the build process so we only need to create the symlink for the Angular component library.
Go to `packages/components-angular` folder and run the below:

In your angular component library, you need to create a symlink.

```bash
yarn link
```

#### Usage

In your own Angular Application, you can run the below to link both libraries

```bash
yarn link @railzai/railz-visualizations
yarn link @railzai/railz-visualizations-angular
```

To make use of the Angular component library in your Angular application, set up your module file to import the visualizations module.

```typescript
import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular/dist';
```

## Contributing

The Railz Visualization library and documentation are open to contributions. For more information, check the [guidelines](./CONTRIBUTING.md).

## License

[MIT License](./LICENSE)

---
