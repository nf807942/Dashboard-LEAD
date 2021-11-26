import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('drawer') drawer;

  sidenavLinks = [
    {icon: 'home', text: 'test1', route:'test1'},
    {icon: 'home', text: 'test2', route:'test2'}
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

  toggle(): void {
    this.drawer.toggle();
  }

}
