import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DisplayCoordinates } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private URL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  saveData(coordinate: DisplayCoordinates) {
    return this.http.post(
      this.URL + '/save-coordinate',
      JSON.stringify(coordinate),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
}
