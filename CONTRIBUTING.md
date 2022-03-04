# Contributing

The Railz Visualization library and documentation are open to contributions.

## Components

[Boilerplate Example](https://github.com/railz-ai/railz-visualizations/blob/master/BOILERPLATE_COMPONENT.md) contains details on how to create a new component

## Pull Requests

We have [Semantic Pull Request](https://github.com/probot/semantic-pull-requests) application installed on GitHub to ensure your commits follow the semantic [syntax](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-description-and-breaking-change-footer).
This makes it easy to trigger a release.

### How it works

Your commit message needs to have a semantic message.

| Scenario                             | Status | Message                               |
| ------------------------------------ | ------ | -----------------------------------   |
| PR title is semantic                 | 💚     | **ready to be squashed**              |
| One or more commit is semantic       | 💚     | **ready to be merged or rebased**     |
| Nothing is semantic                  | 💛     | **add a semantic commit or PR title** |

### How to write your commits

1. Make sure your commit is a [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/#examples).
2. Add a semantic prefix `fix:` or `feat:` or other [conventional commit types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json) when commiting your code.

### Merging
When utilising tools on your local, make sure you use rebase. When merging in GitHub, ensure you use **Rebase and Merge.** to keep the **master** branch history clean.