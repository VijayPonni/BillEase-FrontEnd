import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class DropDownDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output()
  public appClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }
}
