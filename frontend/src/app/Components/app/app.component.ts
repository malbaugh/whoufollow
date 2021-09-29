import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/CurrentUser/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public searchForm!: FormGroup;
  public userLocation: string = "";
  
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public currentUserService: CurrentUserService,
    public fb: FormBuilder,
    public snackBar: MatSnackBar,
    public http: HttpClient) {
  }

  ngOnInit() {
  }

  public ContactMe() {
    window.location.href = 'https://twitter.com/dane_albaugh';
  }
  
}
