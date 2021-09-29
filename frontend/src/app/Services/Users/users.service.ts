import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Source } from 'src/Helpers/Sources/Classes/Sources';
import { CurrentUserService } from '../CurrentUser/current-user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.baseUrl;
  private sources: Source[] = [];
  private source!: Source;

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService
  ) { }

  // GET
  public GetUserStage() {
    return this.http.get<any>(`${this.baseUrl}/users`)
    .pipe(map(response => {
      return [response['ready_to_rank'], response['sources_ranked'], response['stats_available']];
    }));
  }

  public GetSomeSourcesToRank() {
    return this.http.get<any>(`${this.baseUrl}/sources`)
    .pipe(map(response => {
      return this.HttpResponseToSurvey(response['sources']);
    }));
  }

  public RevealTopRatedSources() {
    return this.http.get<any>(`${this.baseUrl}/ratings`)
    .pipe(map(response => {
      return [this.HttpResponseToSurvey(response['credible_sources']), this.HttpResponseToSurvey(response['popular_sources']), this.HttpResponseToSurvey(response['uncredible_sources']), this.HttpResponseToSurvey(response['unpopular_sources'])];
    }));
  }


  // POST

  public SubmitSomeSources(sources: string[]) {
    return this.http.post<any>(`${this.baseUrl}/sources`,JSON.stringify({"names": sources}))
    .pipe(map(response => {
      return response;
    }));
  }

  public SubmitARating(sourceId: number, known: boolean, credible: boolean) {
    return this.http.post<any>(`${this.baseUrl}/ratings`,JSON.stringify({"sourceId": sourceId, "credible": credible, "known":known}))
    .pipe(map(response => {
      return response;
    }));
  }


  public HttpResponseToSurvey(data: any): Source[] {
    this.sources = [];
    for (var i = 0; i != (Object.keys(data).length); i++) {
      this.source = new Source(
        data[i].id,
        data[i].name,
        data[i].popularity_rank,
        data[i].credibility_rank,
        data[i].uncredibility_rank,
        data[i].credibility_sum
      );
      
      this.sources[i] = this.source;
    }
    return this.sources;
  }
}
