import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-rating-stars',
  templateUrl: './c-rating-stars.component.html',
  styleUrls: ['./c-rating-stars.component.scss']
})
export class CRatingStarsComponent implements OnInit {

  constructor() { }

  disabled:boolean = false;
  
  ngOnInit(){
    this.loadRating();
  }

  ratingHover(event) {
    this.changeStarsWidth("stars-slider-hover", event);
  }
  
  ratingSet(event) {
    this.changeStarsWidth("stars-slider-selected", event);
  }

  ratingExists(){
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

    if(x === 0 || x > 177 || y === 0 || y > 30){
      stars.style.width = '0px';
    }else{
      stars.style.width = `${widths[index]}px`;
    }

    if(id === "stars-slider-selected"){
      this.ratingExists()
      const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
      this.saveRating(ratings[index])
    }
  }

  loadRating(){
    this.ratingExists();
    let userRating = this.getRating();

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
    stars.style.width = widths[userRating]  || '0px';
  };

  //Backend interaction
  
  getRating(){
    //Get rating from BD
    return 0.5
  }

  saveRating(rate: number){
    //Save rating into BD
    console.log('A guardar en BD', rate)
  }

  deleteRating(){
    document.getElementById("stars-slider-hover").style.display = "block";
    document.getElementById("delete-rating").style.visibility = "hidden";
    document.getElementById("stars-slider-selected").style.width = "0px";
    document.getElementById("stars-slider-hover").style.width = "0px";
    this.disabled = false;

    //Delete rating in BD
  }

}