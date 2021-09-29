import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsersService } from '../Users/users.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  
  private currStrId: BehaviorSubject<any>;
  public unreadCount: number = 0;

  constructor(
  ) {
      this.currStrId = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('strId') || 'null'));
      if (!this.CurrentStrId) {
        this.SetCurrStrId(this.GenId());
      }
    }

  public get CurrentStrId(): any {
    if (this.currStrId.value == null) {
      return false;
    }
    return this.currStrId.value;
  }

  public SetCurrStrId(id: string): void {
    this.RemoveStrId();
    localStorage.setItem('strId',JSON.stringify(id));
    this.currStrId.next(id);
  }
  public RemoveStrId(): void {
    localStorage.removeItem('strId');
    this.currStrId.next(null);
  }

  public GenId() {
    var length = 20;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?/:;{}][';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
