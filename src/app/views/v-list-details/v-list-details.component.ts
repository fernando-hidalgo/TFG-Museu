import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtlistService } from 'src/app/services/artlist.service';
import * as Leaflet from 'leaflet';
import { AuthService } from 'src/app/services/auth.service';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-v-list-details',
  templateUrl: './v-list-details.component.html',
  styleUrls: ['./v-list-details.component.scss']
})
export class VListDetailsComponent implements OnInit {
  data
  page: number = 1;
  progress: number;
  totalSeen: number;
  map: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
    zoom: 3,
    center: { lat: 37.3828300, lng: -5.9731700 } //Sevilla
  }
  artlistId: number
  currentUser: number
  ownerId: number
  canEdit: boolean
  listName: string
  listDescription: string
  params

  constructor(private route: ActivatedRoute, private router: Router, private artlistService: ArtlistService, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.userMe()
    this.currentUser = user?.authId
    
    this.route.params.subscribe(async urlParams => {
      this.params = {}
      this.artlistId = urlParams['artlistId']
      this.ownerId = urlParams['userId']

      this.canEdit = this.ownerId == this.currentUser;
      
      if (this.currentUser) this.params['currentUserId'] = this.currentUser

      this.artlistService.getListContent(this.artlistId, this.params).subscribe(data => {
        const { listName, listDescription } = data;
        this.listName = listName;
        this.listDescription = listDescription;
        this.loadData(data);
        this.setProgressBar(data);
      });
    });
  }

  updateData(event){
    this.loadData(event.data)
    this.page = 1;
  }

  loadData(data){
    this.data = data;
    this.setMarkers()
  }

  setProgressBar(data){
    let totalArtworks = data.artworks.length
    this.totalSeen = data.artworks.filter(artwork => artwork.seen === true).length;
    this.progress = Math.round((this.totalSeen / totalArtworks) * 100)
  }

  /*MAP*/
  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  setMarkers() {
    this.markers.forEach(marker => this.map.removeLayer(marker));

    const markersByMuseum = this.data.artworks.reduce((markers, artwork) => {
      const museum = artwork.museum;
      const existingMarker = markers.find((marker) => marker.museum === museum);
    
      if (existingMarker) {
        existingMarker.artworks.push(artwork.name);
      } else {
        markers.push({
          position: { lat: artwork.latitude, lng: artwork.longitude },
          museum: museum,
          artworks: [artwork.name],
        });
      }
    
      return markers;
    }, []);

    markersByMuseum.forEach((data, index) => {
      const marker = this.generateMarker(data, index);
      this.map.addLayer(marker);
      this.markers.push(marker);
    });
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position).on('click', (event) => this.markerClicked(data, index))
  }

  markerClicked($event: any, index: number) {
    //TODO: Hacer visible el Modal que muestra las obras de ese museo
    console.log($event);
  }

  redirectToEdit(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([`/profile/${this.currentUser}/lists/${this.artlistId}/edit`])
    );
  }

  handleResetFilters() {
    const filterToReset = ['filter1', 'filter2', 'filter3', 'filter4'];
    this.resetFilters(filterToReset);
    this.artlistService.getListContent(this.artlistId, this.params).subscribe(data => {
      this.loadData(data);
    });
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

  navigateToLists() {
    //this.router.navigate([this.router.url, 'lists']);
  }
}
