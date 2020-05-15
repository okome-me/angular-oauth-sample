import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() {
  }

  public async connectApi() {

    // stateの発行
    const state = Math.random().toString(32).substring(2);
    sessionStorage.setItem('state', state);

    const params = new Map();
    params.set('response_type', 'code');
    params.set('client_id', environment.auth.clientId);
    params.set('state', state);
    params.set('scope', environment.auth.scope);
    params.set('redirect_uri', environment.auth.redirectUri);

    let authUrl = `${environment.auth.authUri}?`;
    params.forEach((value: string, key: string) => {
      authUrl += `${key}=${value}&`;
    });

    // 認可エンドポイントにリクエスト
    window.location.href = authUrl;
  }

}
