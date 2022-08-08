import { Component } from '@angular/core';
import { Coordinates } from './map/map.component';
import { MapService } from './services/map.service';

export interface DisplayCoordinates {
  coordinates: Coordinates;
  time: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Client';
  clickedCoordinates: Array<DisplayCoordinates> = [];

  constructor(private mapService: MapService) {}

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
