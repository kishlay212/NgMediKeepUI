import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from 'src/app/shared/user';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email','adderess','action'];
  dataSource: MatTableDataSource<User>;
  currentUser: User = {};
  selectedFile: File | null = null;
  authError: boolean = false;
  validUpload: boolean = false;
  base64String: string | null = null;
  errMsg: any = '';
  alertClassName: string = 'alert-success'; // Default class name
  showAlert: boolean = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private _liveAnnouncer: LiveAnnouncer, private modalService: NgbModal, public userService: UserServiceService) {
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
  openModal(modalContent: any) {
    this.modalService.open(modalContent, { size: 'lg', centered: true });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  updateUser(){
    console.log(this.currentUser);
  }
  isFileValid(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return allowedTypes.includes(file.type);
  }
  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.base64String= event.target.result;
    };
    reader.readAsDataURL(file);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (this.isFileValid(file)) {
      this.selectedFile = file;
      this.authError = false;
      this.validUpload = true;
      this.convertFileToBase64(this.selectedFile);
    } else {
      this.authError = true;
      this.validUpload = false;
      this.errMsg = 'Invalid file type. Please select a PNG or JPG file.';
    }
  }
}