import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {ChartsComponent} from "./charts/charts.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormModule} from "./components/form/form.module";
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/dist";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, HeaderComponent, ChartsComponent
      ],
      imports: [BrowserModule, FormModule, RailzVisualizationsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should not have defined token`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.token).toBeUndefined();
  });
});
