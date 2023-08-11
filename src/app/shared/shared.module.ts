import { NgModule } from '@angular/core';
import { DropDownDirective } from './directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [DropDownDirective, HeaderComponent, FooterComponent],
  imports: [CommonModule],
  exports: [DropDownDirective, HeaderComponent, FooterComponent],
})
export class SharedModule {}
