# Contributing

The Railz Visualization library and documentation are open to contributions.

You can watch the series below on how to get started with contributing to open source projects.
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

<br>

## Local Development

<br>

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

### For `React`

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

### For `Angular`

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

If you do not think your changes are reflected in the components, rebuild the root visualizations directory.

- As long as you have properly executed `yarn link` in the `packages/components` it should update after the build is complete.
- Do not forget that after you link `railz-visualizations` in the `packages/components`, you need to link the components to your example project.
- For react projects you need to link
  - `yarn link @railzai/railz-visualizations`
  - `yarn link @railzai/railz-visualizations-react`
- For Angular projects you need to link
  - `yarn link @railzai/railz-visualizations`
  - `yarn link @railzai/railz-visualizations-angular`

<br>

For other debugging needs you can pass `debug=true` into the visualizations config object

```
<RailzVisualizations
   configuration={{ token: 'valid_token', debug: true  }}
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

## Endpoints - Testing with local or QA data

You will be using `production` accounts/data by default, to test locally/with QA environment you will need to modify the API endpoint, in the railz-visualization `config` object

```
<Visualizations
  configuration={{
    token,
    debug: true,
    endpoint: 'https://api.qa2.railz.ai',
  }}
  filter={filter}
/>
```

You can find this in

- `/examples/react/src/pages/customization/customization.tsx`
- `/examples/react/src/pages/basic/basic.tsx`
- `/examples/angular/src/app/pages/customization/customization.component.ts`
- `/examples/angular/src/app/pages/basic/basic.component.ts`

<br>

### Note: There are other types of visualization components that do not fetch data and you will not need to set the endpoint for them.

- These components are located in the /others example directory

<br>

### Example:

```
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

<br>

## Conventions

<br>

### Formatting

Railz Visualizations makes use of stylelint and eslint, therefore enable linting in your editor for automatic lint detection will make it easy for you to commit your code.

To format, run: `yarn lint`

When you submit a Pull Request, our continuous integration pipeline will test for lint errors.

<br>

## GitHub

<br>
### Issues

For uniformity, we've prepared [templates](https://github.com/railz-ai/railz-visualizations/issues/new/choose) for new issues that everyone can use. When submitting new issues, please be specific and comprehensive! Consider user stories, acceptance criteria, design, and any other details that developers and designers would find useful.

### Branches

The current logic of branch management is a mix of 2 ideas - a clean, linear history of changes and a flow model.

`master` - main branch, should have latest released, approved changes, always compilable and working. Changes should never be committed directly to this branch!

`feature/*` - for features under development (should contain name of the ticket at begin)

`bugfix/*` - for repairing non-fatal existing bugs

`hotfix/*` - for critical bugs which require an immediate release

### Commits

This project adheres to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), which are used to create the changelog. In commit messages, make sure to offer clear and sufficient information.
Your commits should also be linked to an issue to allow us track progress of issues.

```
<type>!: <#issue_number> <descriptive summary>

<optional details>
```

### Pull requests

We have [Semantic Pull Request](https://github.com/marketplace/semantic-prs) application installed on GitHub to ensure your commits follow the semantic [syntax](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-description-and-breaking-change-footer).
This makes it easy to manage our changelog during a release.

#### How to write your commits

1. Make sure your commit is a [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/#examples).
2. Add a semantic prefix `fix:` or `feat:` or other [conventional commit types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json) when commiting your code.

#### Breaking Change

Please follow the instructions [here](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-both--and-breaking-change-footer) to include a title and description if there is a breaking change.

```
<type>!: <#issue_number> <descriptive summary>

<optional details>

BREAKING CHANGE: <details about the change and migration steps (multiple lines allowed)>
```

### Merging

When utilising tools on your local, make sure you use rebase. When merging in GitHub, ensure you use **Rebase and Merge.** to keep the **master** branch history clean.

<br>

### Submitting a bug

To keep track of defect, we use GitHub issues. Please use our issue [templates](https://github.com/railz-ai/railz-visualizations/issues/new/choose) to describe the problem so that we can understand and duplicate it.

Consider the following:

- Descriptive title
- Expected versus Actual Behavior
- How to Reproduce
- If possible, a code snippet example
- Did the problem arise after a recent release, if this is known?

<br>

## Typing

Our code base is TypeScript-based, and we intend to keep it that way. We've set up the project to help you stick to specific standards and guidelines. Here are some more things to think about:

1. As much as possible, avoid using any.
2. Always try to offer a type.
3. Document all public APIs with JSDoc.
4. Don't disregard linting errors; fix them.

<br>

## Accessibility

Components must be accessible; we use axe-core to ensure that our components are accessible internally, and we urge contributors to do the same.

Some resources:

- [Google accessibility overview](https://developers.google.com/web/fundamentals/accessibility/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Axe Core tools](https://www.deque.com/axe/)

<br>

## Components

[Boilerplate Example](https://github.com/railz-ai/railz-visualizations/blob/master/BOILERPLATE_COMPONENT.md) contains details on how to create a new component

New components should be associated with an [issue](https://github.com/railz-ai/railz-visualizations/issues/new/choose). Ensure you use the issue number when committing your git messages.

<br>

## Documentation

Submit a new [issue](https://github.com/railz-ai/railz-visualizations/issues/new?assignees=&labels=&template=documentation-update-request.md&title=) with details containing information about new documentation item and it will be updated on our general docs page.

<br>

## Examples

Details about any new component created should be added to the [examples](./examples) for the supported frameworks.

<br>

## Best practices

The resources below show how we use best practises for our web components:

- [Google Web Component Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
- [Custom Element Conformance](https://html.spec.whatwg.org/multipage/custom-elements.html)

<br>

## Structure

The component structure provided by Stencil is followed. For further information, consult their [style guide](https://github.com/ionic-team/stencil/blob/master/STYLE_GUIDE.md#file-structure).

<br>

## Styling

To ensure that styles are encapsulated, set `shadow: true` in Stencil's `@Component` options. This aids in the consistency of our components across apps.

<br>

## Testing

For any new functionality or problem fixes, components should include unit tests. Ensure that all tests pass, as PRs will not be permitted to merge if even one of them fails.
We encourage you to write test cases and code that expresses your objective.

See Stencil's documentation on [unit testing](https://stenciljs.com/docs/unit-testing) testing. See one of our test examples [here](https://github.com/railz-ai/railz-visualizations/blob/master/packages/components/src/components/statements-chart/test/statements-chart.spec.tsx).

<br>

## Browser support

See our [README.md](https://github.com/railz-ai/railz-visualizations#overview) for a list of supported browsers.
