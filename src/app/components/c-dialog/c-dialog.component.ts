import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-c-dialog',
  templateUrl: './c-dialog.component.html',
  styleUrls: ['./c-dialog.component.scss']
})
export class CDialogComponent implements OnInit {
  writeReviewForm: FormGroup;
  rating;
  type: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private ratingService: RatingService,
    private dialogRef: MatDialogRef<CDialogComponent>
  ) {
    if (data) {
      this.rating = data.rating
      this.type = data.type

      this.writeReviewForm = this.fb.group({
        reviewArea: data.rating.text
      });
    }
  }

  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  saveReview(){
    let writeReviewFormValues = this.writeReviewForm.value;

    let body = {
      value: this.rating.value,
      text: writeReviewFormValues.reviewArea
    }

    this.ratingService.updateRating(this.rating.id, body).subscribe(res => {
      this.dialogRef.close(res);
    });
  }
}
