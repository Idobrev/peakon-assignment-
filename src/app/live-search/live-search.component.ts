import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Manager } from '../models/manager.model';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.scss']
})
export class LiveSearchComponent implements OnInit {
  managers: Manager[];
  filteredManagers: Manager[];
  menuOpened = false;

  @ViewChild('managerContainer') managerContainer: ElementRef;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService.getManagers().subscribe((managers) => {
      this.managers = managers;
      this.filteredManagers = managers;
    });
  }

  /**
   * Scroll based on the pressed arrow key
   */
  onArrowKey(scrollUp: boolean): void {
    let scrollVal = -20;
    if (!scrollUp) {
      scrollVal = 20;
    }
    this.managerContainer.nativeElement.scrollTop += scrollVal;
  }

  onChange(value: string): Manager[] {
    value = value.toLowerCase();
    // we filter the managers based on the data available
    this.filteredManagers = this.managers.filter((manager) =>
      manager.attributes.search.includes(value)
    );
    return this.filteredManagers;
  }

}
