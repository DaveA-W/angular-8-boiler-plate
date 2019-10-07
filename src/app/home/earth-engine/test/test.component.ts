import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import * as ee from '@google/earthengine';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {

  message$ = new BehaviorSubject<string>('EE test activated');

  private auth: gapi.auth2.GoogleAuth;

  constructor(
    private gapiService: GoogleApiService,
  ) {
      // Before click event can happen we need to load the auth library - https://stackoverflow.com/a/47526116/154170
      gapiService.onLoad().subscribe(() => {
        gapi.load('auth2', () => {
          const config = gapiService.getConfig().getClientConfig();
          this.auth = gapi.auth2.init(config);
        });
      });
  }

  ngOnInit(): void {
  }

  onInitializeClick() {
    ee.reset();
    ee.data.setCloudApiEnabled(true);
    this.auth.signIn()
      .then(result => {
        ee.initialize(
          null,
          null,
          () => this.message$.next('EE API initialised'),
          error => this.message$.next(`EE initialization error: ${error}`)
        );
      });
   /*
    ee.apiclient.setAuthClient(client_email, scopes);
    const jwtClient = new google.auth.JWT(privateKey.client_email, null, privateKey.private_key, scopes, null);
    ee.data.setAuthTokenRefresher((authArgs, callback) => {
      jwtClient.authorize((error, token) => {
        error ? callback({error:error}) : callback({access_token:token.access_token, token_type:token.token_type, expires_in:(token.expiry_date - Date.now()) / 1000});
      });
    });
    ee.data.refreshAuthToken(opt_success, opt_error);
    */
  }
}
