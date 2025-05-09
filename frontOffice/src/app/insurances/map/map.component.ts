import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  keyframes,
} from '@angular/animations';
import tt from '@tomtom-international/web-sdk-maps';
import { services } from '@tomtom-international/web-sdk-services';
// import { environment } from 'envirement';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [
    trigger('fancyAppear', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(50px)' }),
        animate(
          '1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private readonly TOMTOM_API_KEY = " environment.tomtom_api_key"; // Replace with your actual API key

  private map!: tt.Map;
  private marker: tt.Marker | null = null;

  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() position = new EventEmitter<{}>();

  searchResults: any[] = [];
  showSearch = false;
  isSearching = false;
  searchError: string | null = null;
  isSatelliteView = false;
  coordinates!: { lat: number; lng: number };
  selectedPosition: boolean = false;
  chosedPosition: boolean = false;
  errorMessage: string = 'null';

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeMap();
      this.setupSearch();
    }, 100);
  }

  private initializeMap() {
    this.map = tt.map({
      key: this.TOMTOM_API_KEY,
      container: this.mapContainer.nativeElement,
      center: [10.187056, 36.800072],
      zoom: 5,
    });

    this.map.addControl(new tt.FullscreenControl());
    this.map.addControl(new tt.NavigationControl());

    this.map.on('click', (e: any) => this.handleMapClick(e));
  }

  private handleMapClick(e: any) {
    this.chosedPosition = false;
    if (!this.map) return;

    this.coordinates = e.lngLat;

    // Remove existing marker
    if (this.marker) {
      this.marker.remove();
    }

    // Add new marker
    this.marker = new tt.Marker().setLngLat(this.coordinates).addTo(this.map);
    this.selectedPosition = true;
  }

  reverseGeocode() {
    services
      .reverseGeocode({
        key: this.TOMTOM_API_KEY,
        position: this.coordinates,
        language: 'fr-FR',
      })
      .then((response: any) => {
        const result = response.addresses[0].address;
        this.chosedPosition = this.checkIfInTunisia(result);
        this.errorMessage = !this.chosedPosition
          ? 'The Chosen Place Is Not In Tunisia'
          : 'null';
        this.position.emit(result);
      })
      .catch((error: any) => console.error('Geocoding error:', error));
  }

  private checkIfInTunisia(data: any): boolean {
    if (data.country == 'Tunisie') return true;
    this.marker = new tt.Marker({ color: 'red' })
      .setLngLat(this.coordinates)
      .addTo(this.map);
    return false;
  }

  private addSatelliteLayer() {
    if (this.map.getSource('satellite-source')) return;

    this.map.addSource('satellite-source', {
      type: 'raster',
      tiles: [
        `https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${this.TOMTOM_API_KEY}&tileSize=256`,
      ],
      tileSize: 256,
    });

    this.map.addLayer({
      id: 'satellite-layer',
      type: 'raster',
      source: 'satellite-source',
      layout: { visibility: 'none' },
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 300);
    }
  }

  toggleSatelliteView() {
    if (!this.map.getLayer('satellite-layer')) {
      this.addSatelliteLayer();
      setTimeout(() => this.toggleSatelliteView(), 100);
      return;
    }

    this.isSatelliteView = !this.isSatelliteView;
    this.map.setLayoutProperty(
      'satellite-layer',
      'visibility',
      this.isSatelliteView ? 'visible' : 'none'
    );
  }

  private setupSearch(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        filter((query) => query.length > 2),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query) => this.searchAddress(query));
  }

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }

  private searchAddress(query: string): void {
    this.isSearching = true;
    this.searchError = null;

    services
      .fuzzySearch({
        key: this.TOMTOM_API_KEY,
        query: query,
        language: 'en-US',
        limit: 5,
      })
      .then((response) => {
        this.handleSearchResponse(response);
      })
      .catch((error) => {
        this.handleSearchError(error);
      })
      .finally(() => {
        this.isSearching = false;
      });
  }

  private handleSearchError(error: any): void {
    this.searchResults = [];
    this.searchError = error?.message || 'Failed to search locations';
    console.error('Search error:', error);
  }

  selectSearchResult(result: any): void {
    if (!result?.position) {
      console.error('Invalid position:', result);
      return;
    }

    this.coordinates = result.position;

    if (this.marker) {
      this.marker.remove();
    }

    this.selectedPosition = true;
    this.marker = new tt.Marker().setLngLat(this.coordinates).addTo(this.map);

    this.map.setCenter(this.coordinates);

    this.map.flyTo({
      speed: 1.2,
      curve: 1.5,
      minZoom: 10,
      maxDuration: 2000,
    });

    this.searchResults = [];
    this.showSearch = false;
    if (this.searchInput?.nativeElement) {
      this.searchInput.nativeElement.value = '';
    }
  }

  private handleSearchResponse(response: any): void {
    if (response?.results?.length) {
      this.searchResults = response.results.filter(
        (result: any) => result.address && result.position
      );
    } else {
      this.searchResults = [];
      this.searchError = 'No results found';
    }
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    if (this.map) {
      this.map.remove();
    }
    if (this.marker) {
      this.marker.remove();
      this.marker = null;
    }
  }
}
