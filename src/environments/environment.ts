export const environment = {
  auth: {
    authUri: 'https://accounts.google.com/o/oauth2/auth',
    tokenUri: 'https://oauth2.googleapis.com/token',
    clientId: 'xxxxxxxx-xxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    clientSecret: 'xxxxxxxxxx',
    redirectUri: 'http://localhost:4200/callback',
    // Google Phots API画像取得のスコープ
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    photosAlbumUri: 'https://photoslibrary.googleapis.com/v1/albums'
  }
};
