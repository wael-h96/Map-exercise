import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapService } from '../services/map.service';
import { DisplayCoordinates } from '../app.component';

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
  clickedCoordinates: Array<DisplayCoordinates> = [];

  constructor(private mapService: MapService) {}
  
  ngOnInit(): void {
    console.log("got ehre")
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
      this.handleClick({lat:evt.coordinate[0],lon:evt.coordinate[1]})
    });
    this.getCoordinates();
  }

  getCoordinates() {
    this.mapService.fetchCoordinates().subscribe((res) => {
      (res as any).forEach(({ _source: coor }: any) =>
        this.clickedCoordinates.push(coor)
      );
    });
  }

  handleClick(coor: Coordinates) {
    const newClickedCoor: DisplayCoordinates = {
      coordinates: coor,
      time: new Date(),
    };
    this.clickedCoordinates.push(newClickedCoor);
    this.mapService
      .saveData(newClickedCoor)
      .subscribe((res) => console.log(res));
  }
}
