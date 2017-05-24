import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { ReplaySubject } from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PlayersService {
    _players:Observable<any> = null;
    _games:Observable<any> = null;
    private dataObs$ = new ReplaySubject();
    private dataGmss$ = new ReplaySubject();

    constructor(private http: Http) { }

    getData(forceRefresh?: boolean) {
        if (!this.dataObs$.observers.length || forceRefresh) {
            this.http.get('/assets/players.json')
            .map((res:Response) => res.json().players)
            .do(players => console.log(players))
            .subscribe(
                data => this.dataObs$.next(data),
                error => {
                    this.dataObs$.error(error);
                    this.dataObs$ = new ReplaySubject();
                }
            );
        }

        return this.dataObs$;
    }

    getGames(forceRefresh?: boolean) {
        if (!this.dataGmss$.observers.length || forceRefresh) {
            this.http.get('/assets/games.json')
            .map((res:Response) => res.json().games)
            .do(games => console.log(games))
            .subscribe(
                data => this.dataGmss$.next(data),
                error => {
                    this.dataGmss$.error(error);
                    this.dataGmss$ = new ReplaySubject();
                }
            );
        }

        return this.dataGmss$;
    }
}