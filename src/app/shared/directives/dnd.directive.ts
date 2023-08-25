import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event']) onDragOver($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    if ($event.dataTransfer?.files) {
      const files = $event.dataTransfer.files;
      this.fileDropped.emit(files);
    }
  }
}
