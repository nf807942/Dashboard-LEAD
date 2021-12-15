;import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { CustomColumn } from './custom-column';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ConnectionService } from '../../services/connection.service';


@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, AfterViewInit {

  filter = new FormControl();

  dataSource: MatTableDataSource<any>;

  @Input() data: Observable<any[]>;
  @Input() columns: CustomColumn[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  loading = true;

  constructor(
    private connectionService: ConnectionService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  get columnsName(): string[] {
    return this.columns.filter(column => (this.connectionService.isAdmin() && column.admin) || !column.admin).map(column => column.property)
  }

  ngOnInit(): void {
    this.data.subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      let column = this.columns.find(column => column.property === property);

      if (column.calculatedProperty) {
        return column.calculatedProperty(item);
      } else if (column.subproperty) {
        return item[property][column.subproperty];
      } else {
        return item[property];
      }
    }
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData(new_data: any[]): void {
    const current_data = this.dataSource.data;
    current_data.push(...new_data);
    this.dataSource.data = current_data;

    this.table.renderRows();
  }

  removeData(data_to_remove: any[]): void {
    const current_data = this.dataSource.data;
    data_to_remove.forEach(element => {
      const index = current_data.findIndex(x => _.isEqual(x, element))
      if (index > -1) {
        current_data.splice(index, 1);
      }
    });
    this.dataSource.data = current_data;

    this.table.renderRows();
  }

  patchData(old_data: any, new_data: any): void {
    const current_data = this.dataSource.data;
    const index = current_data.findIndex(x => _.isEqual(x, old_data))
    if (index > -1) {
      current_data[index] = new_data;
    }
    this.dataSource.data = current_data;

    this.table.renderRows();
  }

  clearData(): void {
    this.dataSource.data = [];

    this.table.renderRows();
  }

  updateTable(): void {
    this.table.renderRows();
  }

  formating(column: CustomColumn, data: any): string {
    if(column.type) {
      if(column.type === 'date') {
        return moment(data).format('DD/MM/YYYY');
      }
    }
    return data
  }
}