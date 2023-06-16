/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { isEmpty } from 'lodash-es';

import { RVSelectStyle } from '../../types';

import { Arrow } from './arrow';

@Component({
  tag: 'railz-select',
  styleUrl: 'select.scss',
  shadow: true,
})
export class Select {
  /**
   * The items to be listed
   */
  @Prop() readonly items: string[] = ['Efficiency', 'Liquidity', 'Profitability', 'Reliability'];

  /**
   * Position of the Select text when opened
   */
  @Prop() readonly selectStyle?: RVSelectStyle = { position: 'right' };

  @Event() selectedItem: EventEmitter<number>;

  @State() private selectedIndex = 0;
  @State() private open = false;

  private selectedItemHandler(selectedIndex: number): void {
    this.selectedItem.emit(selectedIndex);
  }

  render(): HTMLElement {
    if (isEmpty(this.items)) {
      return;
    }

    return (
      <div
        class="rv-select noselect"
        style={this.selectStyle?.style}
        onClick={(): any => (this.open = !this.open)}
      >
        <span>{this.items[this.selectedIndex]}</span>{' '}
        {this.selectStyle?.arrow?.visible === false ? (
          ''
        ) : (
          <Arrow up={this.open} style={this.selectStyle?.arrow?.style} />
        )}
        <span
          class={`rv-select-text rv-${this.selectStyle?.position} ${
            this.open && 'rv-select-text-open'
          }`}
          style={this.selectStyle?.container}
        >
          {this.items.map((item, index) => {
            return (
              <span
                class={this.selectedIndex === index && 'rv-select-text-selected'}
                onClick={(): any => {
                  this.selectedItemHandler(index);
                  this.selectedIndex = index;
                }}
                style={{
                  ...this.selectStyle?.item,
                  ...(this.selectedIndex === index && this.selectStyle?.selectedItem),
                }}
              >
                {item}
              </span>
            );
          })}
        </span>
      </div>
    );
  }
}
