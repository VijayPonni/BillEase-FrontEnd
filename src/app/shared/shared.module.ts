import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DndDirective } from './lib/dnd.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DndDirective],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, DndDirective],
})
export class SharedModule {}
