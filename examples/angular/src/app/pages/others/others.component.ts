import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  barOptions= { barStyle: { background: '#b6ffc0'}, progressStyle: { background: '#2e6521' }};

  constructor() { }

  ngOnInit(): void {
  }

}
