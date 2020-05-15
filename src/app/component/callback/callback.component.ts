import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { TokenService } from '../../service/token.service';

/**
 * トークンエンドポイントのリクエストパラメータ
 */
interface TokenEndPointRequest {
  client_id: string;
  client_secret: string;
  grant_type: string;
  code: string;
  redirect_uri: string;
}

/**
 * トークンエンドポイントのレスポンスパラメータ
 */
interface TokenEndPointResponse {
  access_token: string;
  expires_in: string;
  scope: string;
  token_type: string;
}

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  // 認可コード
  private code: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private tokenService: TokenService) { }

  async ngOnInit() {

    // 認可コード,state取得
    let callbackState;
    await this.route.queryParamMap.subscribe( param => {
      this.code = param.get('code');
      callbackState = param.get('state');
    });

    // state検証
    const issuedState = sessionStorage.getItem('state');
    sessionStorage.removeItem('state');
    if (callbackState !== issuedState) {
      alert('state検証に失敗しました');
      await this.router.navigate(['/home']);
      return;
    }

    // アクセストークン取得
    await this.getAccessToken();

    // 画像表示コンポーネントに遷移
    await this.router.navigate(['/photo']);
  }

  /**
   * アクセストークン
   */
  getAccessToken() {
    const  headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = { headers };

    const body: TokenEndPointRequest = {
      client_id: environment.auth.clientId,
      client_secret: environment.auth.clientSecret,
      grant_type: 'authorization_code',
      code: this.code,
      redirect_uri: environment.auth.redirectUri,
    };
    sessionStorage.removeItem('code_verifier');

    return new Promise( (resolve, reject) => {
      this.http.post<TokenEndPointResponse>(environment.auth.tokenUri, body, options).subscribe( async data => {
        // アクセストークン保持
        await this.tokenService.setAccessToken(data.access_token);
        resolve();
      });
    });
  }
}
