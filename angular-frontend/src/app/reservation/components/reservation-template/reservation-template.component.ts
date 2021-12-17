import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-reservation-template',
  templateUrl: './reservation-template.component.html',
  styleUrls: ['./reservation-template.component.scss']
})
export class ReservationTemplateComponent implements OnInit, OnDestroy {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.links = [
      {text: 'SIDENAV.RESERVATION.RESERVE', route:'reservation/reserve'},
      {text: 'SIDENAV.RESERVATION.MY-RESERVATIONS', route:'reservation/my-reservations'},
      {gap:true, admin: true},
      {text: 'SIDENAV.RESERVATION.BUILDINGS', route:'reservation/buildings', admin: true},
      {text: 'SIDENAV.RESERVATION.ROOMS', route:'reservation/rooms', admin: true}
    ];
  }

  ngOnDestroy(): void {
    this.crossComponentService.links = [];
  }

}
