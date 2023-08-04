import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  currentUser: User = {};
  showModal: boolean = false;
  selectedFile: File | null = null;
  authError: boolean = false;
  validUpload: boolean = false;
  base64String: string | null = null;
  signinForm: User = {};
  errMsg: any = '';
  alertClassName: string = 'alert-success'; // Default class name
  showAlert: boolean = false;
  constructor(
    public authService: AuthService,
    public userService: UserServiceService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res;
    });
    this.signinForm._id = id?.toString();
  }
  ngOnInit() {}

  openModal(modalContent: any) {
    this.modalService.open(modalContent, { size: 'lg', centered: true });
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
  isFileValid(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return allowedTypes.includes(file.type);
  }
  uploadImage(){
    if (this.selectedFile) {
      this.userService.updateProfileImage(this.signinForm._id, this.base64String).subscribe(
        (response) => {
          this.showAlert = true
          this.errMsg ='Image uploaded successfully:';
          this.modalService.dismissAll();
          this.authService.getUserProfile(this.signinForm._id).subscribe((res) => {
            this.currentUser = res;
          });
          // Add any further actions you want to perform
        },
        (error) => {
          this.showAlert = true
          this.errMsg ='Error uploading image:';
        }
      );
    }
  }
  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.base64String= event.target.result;
    };
    reader.readAsDataURL(file);
  }
}
