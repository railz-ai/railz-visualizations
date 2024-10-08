# Boilerplate Example Component

Get started building a new Accounting Data as a Service™ Visualization Component using this boilerplate example.

## Component

Components tags should be prefixed with `railz`.
To generate a component, run `yarn generate`

```tsx
import { Component, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'railz-example',
  styleUrl: 'example.scss',
  shadow: true,
})
export class RailzExample {
  // Properties
  @Prop()
  prop1: string;

  // State
  @State()
  _prop1: string;

  @Watch('prop1')
  watchProp1(newValue, oldValue): void {
    // Content
  }

  // LifeCycle
  componentWillLoad() {
    // Content
  }

  render() {
    return <div class="railz-div">{this._prop1 || ''}</div>;
  }
}
```

## Styling

Your scss custom class names or ids stylings should usse the `railz` prefix.

```scss
.railz-div {
  display: flex;
}
```

## Helper files

Helper files with functionality specific to a component should be in a file named `component-name.util.ts`

## Types & Constants

Interfaces, Enums and Constants should be added in the `types` directory

## Spec Test

```tsx
import { newSpecPage } from '@stencil/core/testing';
import { RailzExample } from '../example';

describe.skip('railz-example', () => {
  it('renders empty without parameter', async () => {
    const page = await newSpecPage({
      components: [RailzExample],
      html: `<railz-example></railz-example>`,
    });
    expect(page.root).toEqualHtml(`
              <railz-example>
                <mock:shadow-root>
                    <div class="railz-div">
                      <div></div>
                    </div>
                </mock:shadow-root>
              </railz-example>
            `);
  });
});
```
