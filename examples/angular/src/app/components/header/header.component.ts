import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  descriptions: any = {
    '/basic': 'This page shows you the default stylings and colors used by the SDK.',
    '/customization': 'This page shows you the customizable options that can be passed to the SDK.',
    '/others': 'This page shows you other reusable components provided the SDK.',
  };
  description = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.description = this.descriptions[this.router.url.toString()];
      }
    });
  }

  ngOnInit(): void {}
}
