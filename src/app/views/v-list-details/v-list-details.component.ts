import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ArtlistService } from 'src/app/services/artlist.service';
import * as Leaflet from 'leaflet';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CDialogComponent } from 'src/app/components/c-dialog/c-dialog.component';
import { buttonColorMode, filterMode, filterToReset, filterType } from 'src/app/app.interfaces';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-v-list-details',
  templateUrl: './v-list-details.component.html',
  styleUrls: ['./v-list-details.component.scss']
})
export class VListDetailsComponent implements OnInit {
  //CONSTANTS
  filterToReset = filterToReset;
  filterMode = filterMode;
  filterType = filterType;
  buttonColorMode = buttonColorMode

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
  dialogRef

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artlistService: ArtlistService,
    private authService: AuthService,
    private dialog: MatDialog,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    const user = this.authService.userMe()
    this.currentUser = user?.authId

    //Cierra el dialogo si se hacen cambios de vista con el navbar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && this.dialogRef) {
        this.dialogRef.close();
      }
    });
    
    this.route.params.subscribe(async urlParams => {
      this.params = {}
      this.artlistId = urlParams['artlistId']
      this.ownerId = urlParams['userId']

      this.canEdit = this.ownerId == this.currentUser;
      
      if (this.currentUser) this.params['currentUserId'] = this.currentUser

      this.artlistService.getListContent(this.artlistId, this.params).subscribe(data => {
        const { listName, listDescription } = data;
        this.listName = listName;
        this.listDescription = listDescription.replace(/\n/g, '<br>');
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

    markersByMuseum.forEach((data) => {
      const marker = this.generateMarker(data);
      marker.addEventListener("click", ()=> {this.zone.run(() => this.openMapMuseumDialog(data))});
      this.map.addLayer(marker);
      this.markers.push(marker);
    });
  }

  generateMarker(data: any) {
    return Leaflet.marker(data.position)
  }

  /*HEADER BUTTONS*/
  handleResetFilters() {
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
    this.router.navigate([this.router.url.replace(/\/\d+$/, '')]);
  }

  navigateToEdit(){
    this.router.navigate([`/profile/${this.currentUser}/lists/${this.artlistId}/edit`])
  }

  /*DIALOG*/
  openMapMuseumDialog(dialogData) {
    this.dialogRef = this.dialog.open(CDialogComponent,{
      data:{
        type: "map",
        museum: dialogData.museum,
        artworks: dialogData.artworks
      },
      autoFocus: true
    });
  }
}
