import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from 'src/app/shared/user';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email','adderess','action'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private _liveAnnouncer: LiveAnnouncer, public userService: UserServiceService) {
    // Create 100 users
    this.dataSource = new MatTableDataSource();
    this.userService.getAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    });
    // Assign the data to the data source for the table to render
    
  }
  @ViewChild(MatSort)
  sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}