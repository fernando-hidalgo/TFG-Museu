import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-v-profile',
  templateUrl: './v-profile.component.html',
  styleUrls: ['./v-profile.component.scss']
})
export class VProfileComponent implements OnInit {
  currentUser: number
  page: number = 1;
  data;
  profileId: number;
  userNickname
  params = {}

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.authService.userMe()
    this.currentUser = user?.authId
    
    this.route.params.subscribe(async urlParams => {
      this.profileId = urlParams['userId']
      this.params = {}

      if(this.currentUser){
        if(this.profileId != this.currentUser){
          this.params['currentUserId'] = this.currentUser
        } else {
          this.params['currentUserId'] = this.profileId
          this.userNickname = user?.nickname
        }
      } else {
        this.userService.getUserNicknameById(this.profileId).subscribe(res => {
          this.userNickname = res.nickname
        })
      } //En caso de no estar logeado, params se envía vacio, así el ojo siempre sale gris

      this.getArtworksRatedByUser(this.profileId, this.params)
    });
  }

  getArtworksRatedByUser(profileId, params){
    this.artworkService.findArtworkRatedByUser(profileId, params).subscribe(data => {
      this.loadData(data)
    });
  }

  updateData(event){
    this.loadData(event.data)
    this.page = 1;
  }

  loadData(data){
    this.data = data;
  }

  resetFilters(filterToReset: string[]) {
    filterToReset.forEach((filterName) => {
      const inputElement = document.getElementById(filterName)?.querySelector('input');
      
      if (inputElement) {
        inputElement.value = '';
        inputElement.style.pointerEvents = 'auto';
      }
    });
  }
  
  handleResetFilters() {
    const filterToReset = ['filter1', 'filter2', 'filter3', 'filter4'];
    this.resetFilters(filterToReset);
    this.getArtworksRatedByUser(this.profileId, this.params)
  }

  navigateToLists() {
    this.router.navigate([this.router.url, 'lists']);
  }
}
