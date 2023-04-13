import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-c-image-uploader',
  templateUrl: './c-image-uploader.component.html',
  styleUrls: ['./c-image-uploader.component.scss']
})
export class CImageUploaderComponent implements OnInit {
  @Output("setCoverImage") setCoverImage: EventEmitter<any> = new EventEmitter();
  selectedFiles?: FileList;
  preview: string;

  constructor() {}

  ngOnInit(): void {}

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFiles[0]);
      this.setCoverImage.emit({ coverImage: this.selectedFiles[0] });
    }
  }

}
