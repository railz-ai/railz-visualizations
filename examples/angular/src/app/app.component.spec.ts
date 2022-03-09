import { TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular/dist';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormModule } from './components/form/form.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent],
      imports: [BrowserModule, FormModule, RailzVisualizationsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
