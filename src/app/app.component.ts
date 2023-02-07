import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tfg-museu';
  starsValue: number;
  bounds: DOMRect;
  saveValue
  
  ngOnInit(){
    this.bounds = document.getElementById("stars-slider").getBoundingClientRect();
  }

  ratingHover(event) {
    this.changeStarsWidth("stars-slider-hover", event);
  }
  
  ratingSet(event) {
    document.getElementById("stars-slider-hover").style.display = "none";
    this.changeStarsWidth("stars-slider-selected", event);
  }
  
  ratingHoverClear() {
    //No vale asi:
    //document.getElementById("stars-slider-hover").style.width = "0px";

    
  }

  deleteRating(){
    document.getElementById("stars-slider-hover").style.display = "block";
    document.getElementById("stars-slider-selected").style.width = "0px";
  }
  
  changeStarsWidth(id, event) {
    const stars = document.getElementById(id);
    const x = Math.max(0, event.clientX - this.bounds.left);
    const widths = [18, 36, 54, 72, 90, 108, 126, 144, 162, 180];
    const index = Math.min(Math.floor(x / 18), widths.length - 1);
    stars.style.width = `${widths[index]}px`;

    if(id === "stars-slider-selected"){
      const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
      this.saveValue = ratings[index];
      console.log(this.saveValue)
    }
  }
}
