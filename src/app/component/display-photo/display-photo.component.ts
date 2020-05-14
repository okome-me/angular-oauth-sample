import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../service/token.service';
import { environment } from '../../../environments/environment';

/**
 * Google Photos APIのI/F
 */
interface AlbumResponse {
  albums: Album[];
}
interface Album {
  mediaItemsCount: string;
  coverPhotoMediaItemId: string;
  coverPhotoBaseUrl: string;
  id: string;
  title: string;
  productUrl: string;
}

@Component({
  selector: 'app-display-photo',
  templateUrl: './display-photo.component.html',
  styleUrls: ['./display-photo.component.css']
})
export class DisplayPhotoComponent implements OnInit {

  private accessToken: string;
  public imgUrl: string;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    // アクセストークンの取得
    this.tokenService.accessToken.subscribe( token => {
      this.accessToken = token;
    });
  }

  ngOnInit() {
    // Google Photos API
    this.getGooglePhotos(this.accessToken);
  }

  /**
   * Google Photos APIで画像取得
   */
  getGooglePhotos(accessToken: string) {
    console.log(accessToken);
    const headers = new HttpHeaders(
      { Authorization: 'Bearer ' + accessToken }
    );
    const options = { headers };
    this.http.get<AlbumResponse>(environment.auth.photosAlbumUri, options).subscribe( data => {
      this.imgUrl = data.albums[0].coverPhotoBaseUrl;
    });
  }
}
