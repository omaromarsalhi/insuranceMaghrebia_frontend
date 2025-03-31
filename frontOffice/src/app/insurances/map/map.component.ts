import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { services } from '@tomtom-international/web-sdk-services';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private readonly TOMTOM_API_KEY = ''; // Replace with your actual API key

  private map: tt.Map | null = null;
  private marker: tt.Marker | null = null;

  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  searchResults: any[] = [];
  showSearch = false;
  isSearching = false;
  searchError: string | null = null;
  isSatelliteView = false;

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
      center: [10.187056, 36.800072], // Default to NYC
      zoom: 5,
    });

    this.map.addControl(new tt.FullscreenControl());
    this.map.addControl(new tt.NavigationControl());
  }

  // 2. Satellite layer setup
  private addSatelliteLayer() {
    if (this.map) {
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
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 300);
    }
  }

  toggleSatelliteView() {
    if (this.map) {
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

    console.log(query);

    services
      .fuzzySearch({
        key: this.TOMTOM_API_KEY,
        query: query,
        language: 'en-US',
        limit: 5,
      })
      .then((response) => {
        console.log(response);
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

    const coordinates: [number, number] = [
      result.position.lng,
      result.position.lat,
    ];

    if (this.marker) {
      this.marker.remove();
    }

    if (this.map) {
      this.marker = new tt.Marker().setLngLat(coordinates).addTo(this.map);

      this.map.setCenter(coordinates);

      this.map.flyTo({
        speed: 1.2,
        curve: 1.5,
        minZoom: 10,
        maxDuration: 2000,
      });
    }

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
      console.log(this.searchResults);
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
      this.map = null;
    }
    if (this.marker) {
      this.marker.remove();
      this.marker = null;
    }
  }
}
