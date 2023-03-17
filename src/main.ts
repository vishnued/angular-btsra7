import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TwinComponent } from './twin/twin/twin.component';
import { TwinModule } from './twin/twin.module';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule,TwinModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <app-twin></app-twin>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
