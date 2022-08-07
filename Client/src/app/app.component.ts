import { Component } from '@angular/core';
import { Coordinates } from './map/map.component';

interface DisplayCoordinates {
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

  handleClick(coor: Coordinates) {
    const newClickedCoor: DisplayCoordinates = {
      coordinates: coor,
      time: new Date(),
    };
    this.clickedCoordinates.push(newClickedCoor);
  }
}
