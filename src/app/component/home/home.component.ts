import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() { }

  public connectApi() {

    const params = new Map();
    params.set('response_type', 'code');
    params.set('client_id', environment.auth.clientId);
    params.set('state', 'xyz');　// ランダムな値で問題ありません
    params.set('scope', environment.auth.scope);
    params.set('redirect_uri', environment.auth.redirectUri);

    let authUrl = `${environment.auth.authUri}?`;
    params.forEach( (value: string, key: string) => {
      authUrl += `${key}=${value}&`;
    });

    // 認可エンドポイントにリクエスト
    window.location.href = authUrl;
  }
}
