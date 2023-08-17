import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    if ($event.dataTransfer.files) {
      const files = $event.dataTransfer.files;
      this.fileDropped.emit(files);
    }
  }
}
