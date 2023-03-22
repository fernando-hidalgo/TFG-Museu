import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-c-rating-stars',
  templateUrl: './c-rating-stars.component.html',
  styleUrls: ['./c-rating-stars.component.scss']
})
export class CRatingStarsComponent implements OnInit {
  @Input() curretUserRating
  @Input() artworkId
  @Output("updateRatings") updateRatings: EventEmitter<any> = new EventEmitter();

  constructor(private ratingService: RatingService) { }

  disabled: boolean = false;

  ngOnInit() {
    if (this.curretUserRating !== '') this.loadRating()
  }

  ratingHover(event) {
    this.changeStarsWidth("stars-slider-hover", event);
  }

  ratingSet(event) {
    this.changeStarsWidth("stars-slider-selected", event);
  }

  displayRating() {
    this.disabled = true;
    document.getElementById("stars-slider-hover").style.display = "none";
    document.getElementById("delete-rating").style.visibility = "visible";
  }

  changeStarsWidth(id, event) {
    const stars = document.getElementById(id);
    let bounds = document.getElementById("stars-slider").getBoundingClientRect();
    const x = Math.max(0, event.clientX - bounds.left);
    const y = Math.max(0, event.clientY - bounds.top);
    const widths = [18, 36, 54, 72, 90, 108, 126, 144, 162, 180];
    const index = Math.min(Math.floor(x / 18), widths.length - 1);

    if (x === 0 || x > 177 || y === 0 || y > 30) {
      stars.style.width = '0px';
    } else {
      stars.style.width = `${widths[index]}px`;
    }

    if (id === "stars-slider-selected") {
      this.displayRating()
      const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
      this.createRating(ratings[index])
    }
  }

  loadRating() {
    this.displayRating();
    let userRating = this.curretUserRating.value;

    let stars = document.getElementById("stars-slider-selected");
    const widths = {
      0.5: '18px',
      1: '36px',
      1.5: '54px',
      2: '72px',
      2.5: '90px',
      3: '108px',
      3.5: '126px',
      4: '144px',
      4.5: '162px',
      5: '180px'
    };
    stars.style.width = widths[userRating] || '0px';
  };

  //BACKEND INTERACTIONS
  //Create
  async createRating(rate: number) {
    let body = {
      value: rate,
      text: this.curretUserRating?.text || '',
      artwork: this.artworkId,
      user: 2 //TODO: Debe ser cambiado por el id del usuario actualmente logueado
    }

    this.ratingService.createRating(body).subscribe(newRating => {
      this.curretUserRating = newRating
      const ratingId = this.curretUserRating.id
      this.updateRatings.emit({ratingId, mode: 'create'});
    })
  }

  //Delete rating
  deleteRating() {
    document.getElementById("stars-slider-hover").style.display = "block";
    document.getElementById("delete-rating").style.visibility = "hidden";
    document.getElementById("stars-slider-selected").style.width = "0px";
    document.getElementById("stars-slider-hover").style.width = "0px";
    this.disabled = false;

    //TODO: Esta petición debe estar realmente en un modal de confirmación
    this.ratingService.deleteRating(this.curretUserRating.id).subscribe(() => {
      const ratingId = this.curretUserRating.id
      this.curretUserRating = null;
      this.updateRatings.emit({ratingId, mode: 'delete'});
    });
  }
}