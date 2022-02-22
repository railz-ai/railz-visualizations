import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html'
})
export class AuthFormComponent implements OnInit {
  @Input() authForm: FormGroup = new FormGroup({});
  @Output() authEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm && this.authForm.valid) {
      this.authEvent.emit();
    }
  }
}
