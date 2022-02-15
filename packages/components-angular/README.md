# Components Angular

This is an angular wrapper for `@railzai/railz-visualization`, it was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Code scaffolding

Run `ng generate component component-name --project components-angular` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project components-angular`.
> Note: Don't forget to add `--project components-angular` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build components-angular` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build components-angular`, go to the dist folder `cd dist/components-angular` and run `npm publish`.

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
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/src";
```

