# Contributing

The Railz Visualization library and documentation are open to contributions.

You can watch the series below on how to get started with contributing to open source projects.
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Conventions

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
