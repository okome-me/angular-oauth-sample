import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public accessToken = this.accessTokenSubject.asObservable();

  constructor() { }

  /**
   * アクセストークンの更新
   * @param accsessToken アクセストークン
   */
  setAccessToken(accsessToken: string) {
    this.accessTokenSubject.next(accsessToken);
  }
}
