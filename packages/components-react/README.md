# components-react

This is a react wrapper for `@railzai/railz-visualization`, it is based of stencil sample template
## Local Development
### Link Your Packages

To build and test your components locally, you will need to link the packages together. This is a replacement for publishing packages to npm that allows you to develop and test locally.

To do this, we’ll use the npm link command, follow the steps below to setup local environment.

1. Clone this repository
2. Install dependencies using yarn install or npm install
3. Build the **packages/components** library and create a symlink to the library.
```bash
npm run build
npm link
```

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