import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Building } from '../models/building';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    public api: ApiService,
  ) { }

  //#region Building
  getBuildings(): Observable<Building[]> {
    return this.api.get('reservation', 'buildings');
  }

  putBuilding(building: Building): Observable<Building> {
    return this.api.put('reservation', 'building', building);
  }

  patchBuilding(building: Building): Observable<{old: Building, new: Building}> {
    return this.api.patch('reservation', 'building', building, building.id);
  }

  deleteBuilding(building: Building): Observable<Building> {
    return this.api.delete('reservation', 'building', building.id);
  }
  //#endregion

  //#region Room
  getRooms(): Observable<Room[]> {
    return this.api.get('reservation', 'rooms');
  }

  putRoom(room: Room): Observable<Room> {
    return this.api.put('reservation', 'room', room);
  }

  patchRoom(room: Room): Observable<{old: Room, new: Room}> {
    return this.api.patch('reservation', 'room', room, room.id);
  }

  deleteRoom(room: Room): Observable<Room> {
    return this.api.delete('reservation', 'room', room.id);
  }
}
