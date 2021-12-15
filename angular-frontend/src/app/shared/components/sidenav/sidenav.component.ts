import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../../services/connection.service';
import { CrossComponentService } from '../../services/cross-component.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('chevronAnimation', [
        transition(':enter', [
            style({  opacity: 0 }),
            animate('0.1s', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('0.1s', style({ opacity: 0 }))
        ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  get open(): boolean {
    return localStorage.getItem('sidenav-open') === 'true';
  }

  set open(b: boolean) {
    localStorage.setItem('sidenav-open', b ? 'true' : 'false');
  }

  environement = environment;

  @ViewChild('drawer') drawer;

  first_links = [
    {icon: 'login', text: 'SIDENAV.LOGIN', route:'login', logout:true},
    {icon: 'apps', text: 'SIDENAV.MODULES', route:''},
    {icon: '', text: '', route:'', gap:true},
  ];
  mids_links = [];
  last_links = [
    {icon: '', text: '', route:'', gap:true},
    {icon: 'logout', text: 'SIDENAV.LOGOUT', action: () => this.connectionService.logout()},
  ];

  all_links = [...this.first_links, ...this.mids_links, ...this.last_links]

  badges = [];

  constructor(
    public connectionService: ConnectionService,
    private crossComponentService: CrossComponentService,
    private changeDetector: ChangeDetectorRef) {
      if(localStorage.getItem('sidenav-open') === null) {
        this.open = true;
      }
  }

  ngOnInit(): void {
    this.crossComponentService.linksChanged.subscribe((links) => {
      this.all_links = [...this.first_links, ...links, ...this.last_links];
      this.changeDetector.detectChanges();
    });

    this.crossComponentService.badgesChanged.subscribe((badges) => {
      this.badges = badges;
      this.changeDetector.detectChanges();
    });
  }

  toggle(): void {
    this.drawer.toggle();
    this.open = !this.open;
  }

  getBadgeOfLink(link: any): number | null {
    return this.badges.find(badge => badge.text === link.text)?.value
  }

}
