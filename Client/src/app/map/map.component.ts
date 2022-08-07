import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export interface Coordinates {
  lat: number | null;
  lon: number | null;
}

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: Map | undefined;
  @Output() mapClick = new EventEmitter();
  clickedCoordinates: Coordinates;

  constructor() {
    this.clickedCoordinates = { lat: null, lon: null };
  }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map',
    });
    this.map.on('click', (evt) => {
      this.clickedCoordinates.lat = evt.coordinate[0];
      this.clickedCoordinates.lon = evt.coordinate[1];
    });
  }

  handleMapClick() {
    this.mapClick.emit(this.clickedCoordinates);
  }
}
