import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { RVOptions } from '@railzai/railz-visualizations';

@Component({
  selector: 'app-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.css'],
})
export class OptionsFormComponent implements OnInit {
  @Input() options?: RVOptions;
  @Output() optionEvent = new EventEmitter<RVOptions>();
  public editorOptions: JsonEditorOptions;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['tree'];
    this.editorOptions.mode = 'tree';
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
  }

  ngOnInit(): void {}

  optionsUpdate(option: Event) {
    this.optionEvent.emit(option as any);
  }
}
