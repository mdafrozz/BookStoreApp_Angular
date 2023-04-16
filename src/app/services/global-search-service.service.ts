import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchServiceService {
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('null');
  constructor() { }
}
