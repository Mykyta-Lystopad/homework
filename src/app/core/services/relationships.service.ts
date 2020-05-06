import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable()
export class RelationshipsService {
  private id$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor() {
  }

  setId(id: number) {
    this.id$.next(id)
  }

  getIdObservable() {
    return this.id$.asObservable();
  }

}
