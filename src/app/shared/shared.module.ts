import { NgModule } from '@angular/core';
import { DropDownDirective } from './directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndDirective } from './directives/dnd.directive';

@NgModule({
  declarations: [DropDownDirective, HeaderComponent, FooterComponent, DndDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    DropDownDirective,
    HeaderComponent,
    FooterComponent,
    DndDirective,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule {}
