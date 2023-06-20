## Local Development

### Build Your Packages

To build and test your components locally, you will need to link the packages together. This is a replacement for
publishing packages to npm that allows you to develop and test locally. We are
using [lerna](https://github.com/lerna/lerna) to do this for us

From the main folder:

1. Clone this [repository](https://github.com/railz-ai/railz-visualizations.git)
2. Install the dependency needed to setup the packages from the main folder.
   ```bash
   yarn
   ```
3. Install lerna using yarn
   ```bash
   yarn global add lerna
   ```
4. Run the bootstrap command to install all the dependencies for the packages, lerna will handle the linking between the
   packages
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

### For React

Lerna already linked the stencil component library to the React library during the build process so we only need to
create the symlink for the React component library. Go to `packages/components-react` folder and run the below:

```bash
yarn link
```

#### Usage

In your own React Application, you can run the below to link both libraries

```bash
yarn link @railzai/railz-visualizations
yarn link @railzai/railz-visualizations-react
```

To make use of the React component library in your React application, import the components from the React component
library in the file where you want to use them.

```typescript jsx
import { RailzVisualizations } from '@railzai/railz-visualizations-react';
```

### For Angular

Lerna already linked the stencil component library to the Angular library during the build process so we only need to
create the symlink for the Angular component library. Go to `packages/components-angular` folder and run the below:

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

To make use of the Angular component library in your Angular application, set up your module file to import the
visualizations module.

```typescript
import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular/dist';
```

<br>

## Debugging

<br>

If you do not think your changes are reflected in the components, rebuild the root visualizations directory using `yarn build`.

- As long as you have properly executed `yarn link` in the `packages/components` it should update after the build is complete.
- Do not forget that after you link `railz-visualizations` in the `packages/components`, you need to link the components to your example project.
- For react projects you need to link
  - `yarn link @railzai/railz-visualizations`
  - `yarn link @railzai/railz-visualizations-react`
- For Angular projects you need to link
  - `yarn link @railzai/railz-visualizations`
  - `yarn link @railzai/railz-visualizations-angular`

<br>

Optionally, you can set `debug=true` in the visualizations configuration object

```javascript
<RailzVisualizations
  configuration={{ token: 'valid_token', debug: true }}
  filter={{
    businessName: 'testFreshbooks',
    serviceName: RVAccountingProviders.FRESHBOOKS,
    reportType: RVReportTypes.BALANCE_SHEET,
    startDate: '2021-01-01',
    endDate: '2022-01-28',
    reportFrequency: RVReportFrequency.MONTH,
  }}
/>
```

<br>

### Note: There are other types of visualization components that do not fetch data and you will not need to set the endpoint for them.

- These components are located in the /others example directory

<br>

### Example:

```javascript
import { RVReportTypes } from '@railzai/railz-visualizations';

<RailzLoading
  loadingText="Loading Data"
  fillColor={'#000000'}
  textStyle={{ color: '#00884f', fontSize: '18px', fontWeight: 400 }}
  width="150px"
  height="150px"
/>

<RailzProgressBar reportType={RVReportTypes.INVOICES} />
```
