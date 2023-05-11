import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArtlistService } from 'src/app/services/artlist.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-c-dialog',
  templateUrl: './c-dialog.component.html',
  styleUrls: ['./c-dialog.component.scss']
})
export class CDialogComponent implements OnInit {
  writeReviewForm: FormGroup;
  rating;
  lists;
  listsToAdd: number[] = [];
  type: string;
  artworkId: number;

  //Map Dialog
  museum: string
  artworksInMuseum: string[]

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private ratingService: RatingService,
    private artlistService: ArtlistService,
    private dialogRef: MatDialogRef<CDialogComponent>
  ) {
    if(data) this.type = data.type
  
    if (this.type === 'review') {
      this.rating = data.rating

      this.writeReviewForm = this.fb.group({
        reviewArea: data.rating.text
      });

    } else if (this.type === 'add-list') {
      this.artlistService.getUserLists(data.userId).subscribe(res => {
        this.artworkId = data.artworkId
        //Se eliminan las listas que ya tienen la presente obra añadida
        this.lists = res.filter(list => !list.artworks.some(artwork => artwork.id === data.artworkId));
      })
    } else if (this.type === 'map') {
      this.museum = data.museum;
      this.artworksInMuseum = data.artworks
    }
  }

  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  saveReview() {
    let writeReviewFormValues = this.writeReviewForm.value;

    let body = {
      value: this.rating.value,
      text: writeReviewFormValues.reviewArea
    }

    this.ratingService.updateRating(this.rating.id, body).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  addToList(listId) {
    const listOption = document.getElementById(listId);
    const listIndex = this.listsToAdd.indexOf(listId);
  
    if (listIndex !== -1) {
      this.listsToAdd.splice(listIndex, 1);
      listOption.style.backgroundColor = "#678";
    } else {
      this.listsToAdd.push(listId);
      listOption.style.backgroundColor = "#00b020";
    }
  }  

  saveAddToList() {
    this.artlistService.addToListModal(this.artworkId, {arlistsIds: this.listsToAdd}).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
