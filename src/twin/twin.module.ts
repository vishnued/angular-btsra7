import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReteModule } from 'rete-angular-render-plugin';
import { TwinComponent } from './twin/twin.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TwinComponent],
  exports: [TwinComponent, ReteModule],
})
export class TwinModule {}
