import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtlistService } from 'src/app/services/artlist.service';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-v-list-details',
  templateUrl: './v-list-details.component.html',
  styleUrls: ['./v-list-details.component.scss']
})
export class VListDetailsComponent implements OnInit {
  page: number = 1;
  progress: number;
  totalSeen: number;
  data
  currentUser = 2  //TODO: Debe ser cambiado por datos del usuario actualmente logueado

  constructor(private route: ActivatedRoute, private artlistService: ArtlistService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async urlParams => {
      let params = {}
      let artlistId = urlParams['artlistId']
      if (this.currentUser) params['currentUserId'] = this.currentUser

      this.artlistService.getListContent(artlistId, params).subscribe(data => {
        this.loadData(data)
        this.setProgressBar(data);
      });
    });
  }

  updateData(event){
    this.loadData(event.data)
  }

  loadData(data){
    this.data = data;
  }

  setProgressBar(data){
    let totalArtworks = data.artworks.length
    this.totalSeen = data.artworks.filter(artwork => artwork.seen === true).length;
    this.progress = (this.totalSeen / totalArtworks) * 100
  }

  //TODO: Una vez funcione, mover a componente propio
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
    zoom: 3,
    center: { lat: 37.3828300, lng: -5.9731700 } //Sevilla
  }

  initMarkers() {
    //TODO: Se crea un objeto Lat,Lng por cada obra en la lista
    const listMarkers = [
      { position: { lat: 37.3828300, lng: -5.9731700 } }
    ];

    for (let index = 0; index < listMarkers.length; index++) {
      const data = listMarkers[index];
      const marker = this.generateMarker(data, index);

      //Tooltip
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);

      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position)
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

}
