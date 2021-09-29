import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/CurrentUser/current-user.service';
import { UsersService } from 'src/app/Services/Users/users.service';
import { Source } from 'src/Helpers/Sources/Classes/Sources';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public sourceActions: any = [
    {
      Icon: 'check_circle',
      Title: "Credible",
      Selected: false,
      Class: "action-item",
      Color: 'accent',
      CredibleValue: true,
      KnownValue: true
    },
    {
      Icon: 'cancel',
      Title: "NOT Credible",
      Selected: false,
      Class: "action-item",
      Color: 'error',
      CredibleValue: false,
      KnownValue: true
    },
    {
      Icon: 'help',
      Title: "Not Familiar",
      Selected: false,
      Class: "action-item",
      Color: '',
      CredibleValue: null,
      KnownValue: false
    },
  ];

  public source!: Source;
  public readyToRank: boolean = false;
  public sourceReviewCount: number = 0;
  public statsAvailable: boolean = false;
  public forceStatsView: boolean = false;
  public sourceNames: string[] = [];
  public sourceControl: FormControl;
  public sourcesToRank: Source[] = [];

  public credibleSources: Source[] = [];
  public uncredibleSources: Source[] = [];
  public popularSources: Source[] = [];
  public unpopularSources: Source[] = [];

  public dataLoaded: boolean = false;
  public loaded: boolean = false;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public userService: UsersService,
    public currentUserService: CurrentUserService
  ) {
    this.sourceControl = new FormControl();
  }

  ngOnInit() {
    this.userService.GetUserStage().subscribe(
      data => {
        this.readyToRank = data[0];
        this.sourceReviewCount = data[1];
        this.statsAvailable = data[2];

        if (this.readyToRank) {
          this.userService.GetSomeSourcesToRank().subscribe(
            data => {
              this.sourcesToRank = data;
              if (this.sourcesToRank.length == 0) {
                this.forceStatsView = true;

                this.userService.RevealTopRatedSources().subscribe(
                  data => {
                    this.credibleSources = data[0];
                    this.popularSources = data[1];
                    this.uncredibleSources = data[2];
                    this.unpopularSources = data[3];
                    this.dataLoaded = true;
                    this.loaded = true;
                  }, 
                  error => {

                  }
                );
              } else {
                this.source = this.sourcesToRank[0];
                this.dataLoaded = true;
                this.loaded = true;
              }
            },
            error => { }
          );
        } else {
          this.dataLoaded = true;
          this.loaded = true;
        }
      },
      error => {

      }
    );
  }

  public AddSourceToList(event: MatChipInputEvent) {
    if (event.value) {
      this.sourceNames.push(event.value);
      this.sourceControl.setValue(null);
    }
  }

  public RemoveSource(sourceName: string) {
    this.sourceNames.forEach((value,index)=>{
      if (value == sourceName) this.sourceNames.splice(index,1);
    });
  }

  public SubmitSources() {
    this.loaded = false;
    this.userService.SubmitSomeSources(this.sourceNames).subscribe(
      data => {
        
      },
      error => {

      },
      () => this.userService.GetSomeSourcesToRank().subscribe(
        data => {
          this.readyToRank = true;
          this.sourceReviewCount = 0;
          this.sourcesToRank = data;
          if (this.sourcesToRank.length == 0) {
            this.userService.RevealTopRatedSources().subscribe(
              data => {
                this.credibleSources = data[0];
                this.popularSources = data[1];
                this.uncredibleSources = data[2];
                this.unpopularSources = data[3];
                this.forceStatsView = true;
                this.loaded = true;
              }, 
              error => {

              }
            );
          }
          this.source = this.sourcesToRank[0];
          this.loaded = true;
        },
        error => {

        }
      )
    );
  }
  public SeeStats() {
    this.loaded = false;
    this.userService.RevealTopRatedSources().subscribe(
      data => {
        this.credibleSources = data[0];
        this.popularSources = data[1];
        this.uncredibleSources = data[2];
        this.unpopularSources = data[3];
        this.forceStatsView = true;
        this.loaded = true;
      }, 
      error => {

      }
    );
  }

  public RankMore() {
    this.loaded = false;
    this.userService.GetSomeSourcesToRank().subscribe(
      data => {
        this.sourcesToRank = data;
        if (this.sourcesToRank.length == 0) {
          this.forceStatsView = true;

          this.userService.RevealTopRatedSources().subscribe(
            data => {
              this.credibleSources = data[0];
              this.popularSources = data[1];
              this.uncredibleSources = data[2];
              this.unpopularSources = data[3];
              this.loaded = true;
            }, 
            error => {

            }
          );
        } else {
          this.forceStatsView = false;
          this.source = this.sourcesToRank[0];
          this.dataLoaded = true;
          this.loaded = true;
        }
      },
      error => { }
    );
  }

  public SelectCredibility(action: any) {
   var i = this.sourceActions.indexOf(action);
    for (var j in this.sourceActions) {
      if (j == i && this.sourceActions[j].Selected == false) {
        this.sourceActions[j].Selected = true;
        this.sourceActions[j].Class = "action-item-selected";
      
      } else {
        this.sourceActions[j].Selected = false;
        this.sourceActions[j].Class = "action-item";
      }
    }

    if (this.sourceActions[i].Selected) {
      this.loaded = false;
      this.userService.SubmitARating(this.source.Id, this.sourceActions[i].KnownValue, this.sourceActions[i].CredibleValue).subscribe(
        data => {
          this.sourceActions[i].Selected = false;
          this.sourceActions[i].Class = 'action-item';
          this.sourceReviewCount = this.sourceReviewCount + 1;
          this.sourcesToRank.forEach((value,index)=>{
            if (value == this.source) this.sourcesToRank.splice(index,1);
          });

          if (this.sourcesToRank.length == 0) {
            this.userService.RevealTopRatedSources().subscribe(
              data => {
                this.credibleSources = data[0];
                this.popularSources = data[1];
                this.uncredibleSources = data[2];
                this.unpopularSources = data[3];
                this.forceStatsView = true;
                this.loaded = true;
              }, 
              error => {

              }
            );
          } else if (this.sourceReviewCount > 4) {
            this.statsAvailable = true;
            this.source = this.sourcesToRank[0];
          } else {
            this.source = this.sourcesToRank[0];
          }
          
          this.loaded = true;
        },
        error => {
        }
      );
    }
  }
  
}
