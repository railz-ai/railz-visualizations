import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.css']
})
export class OptionsFormComponent implements OnInit {
  @Input() options?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
