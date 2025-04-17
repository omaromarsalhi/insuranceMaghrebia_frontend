import { Component, AfterViewInit, EventEmitter, Output  } from '@angular/core';
import * as L from 'leaflet';
import * as opencage from 'opencage-api-client';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'claim-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  apiKey = '28b48f570506482891534a0f48808424';
  private map!: L.Map;
  markers: L.Marker[] = [];
  @Output() locationEmitter = new EventEmitter<{ location: string; coordinates: string }>();

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 13); // Example: Tunis coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.addMarker(event.latlng);
      this.getAddressFromCoords(event.latlng.lat, event.latlng.lng).subscribe(
        adress => this.locationEmitter.emit({location:adress.replace("unnamed road,", ""), coordinates: event.latlng.lat.toString() +','+ event.latlng.lng.toString()})
      )
    });
  }
  
  addMarker(latlng: L.LatLng) {
    const marker = L.marker(latlng, {  }).addTo(this.map!);
    if(this.markers[0]){
      this.markers[0].remove();
      this.markers.pop();
    }
    this.markers.push(marker);
    
  }

  private getAddressFromCoords(lat: number, lng: number): Observable<string> {
    return from(
      opencage.geocode({ q: `${lat},${lng}`, key: this.apiKey })
        .then(response => response.results.length > 0 ? response.results[0].formatted : 'No address found')
    );
  }
}
