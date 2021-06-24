import { Component, OnInit } from '@angular/core';
import { Manager } from '../models/manager.model';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.scss']
})
export class LiveSearchComponent implements OnInit {
  managers: Manager[];
  menuOpened = false;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService.getManagers().subscribe((managers) => { this.managers = managers; });
  }

  onChange(value: string): void {
    // we filter the managers based on the data available
  }
}