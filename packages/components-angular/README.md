Accounting Data as a Service™ is the solution that makes sense of your business customers' financial data.

# Accounting Data as a Service™ Visualizations Angular

<p align="center">
  <a href="https://www.npmjs.com/package/@railzai/railz-visualizations"><img src="https://img.shields.io/npm/v/@railzai/railz-visualizations-angular" alt="Latest Version on NPM"/></a>
  <img src="https://badgen.net/bundlephobia/dependency-count/@railzai/railz-visualizations-angular" alt="Tree shaking"/>
</p>

This is an angular wrapper for `@railzai/railz-visualization`, it was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## To Install

With NPM:

```bash
npm install @railzai/railz-visualizations-react
```

With Yarn:

```bash
yarn add @railzai/railz-visualizations-react
```

## Local Development

To build and test your components locally, you will need to link the packages together. This is a replacement for publishing packages to npm that allows you to develop and test locally.

To do this, we’ll use the npm link command, follow the steps below to setup local environment.

1. Clone this repository
2. Install dependencies using yarn install or npm install
3. Build the **packages/components** library and create a symlink to the library.

```bash
npm run build
npm link
```

### Link Your Packages

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
import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular/dist';
```
