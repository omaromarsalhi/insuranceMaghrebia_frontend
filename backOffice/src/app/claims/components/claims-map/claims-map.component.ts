import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { MapsAPILoader } from "@agm/core";

import { isPlatformBrowser } from "@angular/common";
import * as L from "leaflet";
import { ClaimService } from "../../services/claim.service";
import { Claim } from "../../models/claim";
import html2canvas from "html2canvas";

declare var google: any;
@Component({
  selector: "app-claims-map",
  templateUrl: "./claims-map.component.html",
  styleUrls: ["./claims-map.component.scss"],
})
export class ClaimsMapComponent implements OnInit {
  coordinate = {
    lat: 36.816637, // Set the default latitude
    lng: 10.14617, // Set the default longitude
  };
  longitude = 20.728218;
  latitude = 52.128973;
  markers: any;
  capturedImage: string | null = null;
  googleMap: any;
  leafletMap: any;
  private panorama: any;
  claims: Claim[] = [];

  capturedPanoramaImage: string | null = null;

  @ViewChild("streetviewMap", { static: true }) streetviewMap: any;
  @ViewChild("streetviewPano", { static: true }) streetviewPano: any;

  breadCrumbItems: Array<{}>;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private mapsAPILoader: MapsAPILoader,
    private claimService: ClaimService
  ) {}

  ngOnInit(): void {
    this.claimService.getClaims().subscribe((claims) => {
      this.claims = claims;
      this.loadClaimsInMap();
    });
    this._initGoogleMaps();
    this.initializeMap();
  }

  /**
   * street view map
   */
  _initGoogleMaps() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        this.googleMap = new window["google"].maps.Map(
          this.streetviewMap.nativeElement,
          {
            zoom: 12,
            scrollwheel: false,
          }
        );
        this._initPanorama(this.googleMap, [36.797343, 10.164087]);
      });
    }
  }
  _initPanorama(map: any, position: number[]) {
    this.panorama = new window["google"].maps.StreetViewPanorama(
      this.streetviewPano.nativeElement,
      {
        position: {
          lat: position[0],
          lng: position[1],
        },
      }
    );
    map.setStreetView(this.panorama);
  }

  initializeMap() {
    this.leafletMap = L.map("map").setView([36.816637, 10.14617], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.leafletMap);
  }

  loadClaimsInMap() {
    for (let claim of this.claims) {
      console.log(claim);
      let coords: number[] = claim.locationCoordinates
        .split(",")
        .map((coord) => parseFloat(coord));
      L.marker([coords[0], coords[1]])
        .addTo(this.leafletMap)
        .on("popupopen", () => {
          setTimeout(() => {
            const closeButton = document.querySelector(
              ".leaflet-popup-close-button"
            );
            if (closeButton) {
              closeButton.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent URL change
                event.stopPropagation(); // Stop event bubbling
              });
            }
          }, 200);
        })
        .on("click", () => {
          this._initPanorama(this.googleMap, coords);
        })
        .bindPopup(claim.id)
        .openPopup();
    }
  }

}
