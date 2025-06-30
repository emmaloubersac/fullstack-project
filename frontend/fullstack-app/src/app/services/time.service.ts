import { Injectable } from '@angular/core';
import { interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private time$ = interval(1000).pipe(
    map(() => new Date())
  );

  getTime() {
    return this.time$;
  }

}
