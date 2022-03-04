import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Filter} from "../../../types/form-submission";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  // @ts-ignore
  token: { token: string; };
  filter: Filter;

  constructor(private ref: ChangeDetectorRef) {
  }

  onTokenSubmit = (token: string) => {
    this.token = {token: token};
    this.ref.detectChanges();
  }

  onFilterSubmit = (filter: Filter) => {
    console.log(filter);
    this.filter = filter;
  }

  ngOnInit(): void {
  }
}
