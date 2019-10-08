import { GoogleAuthService, GoogleApiService, NgGapiClientConfig } from 'ng-gapi';
import * as ee from '@google/earthengine';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {

  message$ = new BehaviorSubject<string>('');
  token: string;

  private auth: gapi.auth2.GoogleAuth;
  private config: NgGapiClientConfig;

  constructor(
    private gapiService: GoogleApiService,
  ) {
      // Check for an incoming oauth2 redirect with id_token
      const hash = this.getParamsObjectFromHash();
      if (hash && hash.id_token) {
        this.token = hash.id_token;
        window.location.hash = '';
        this.message$.next('Logged in<br>' + hash.id_token);
      }

      // Before click event can happen we need to load the auth library - https://stackoverflow.com/a/47526116/154170
      gapiService.onLoad().subscribe(() => {
        gapi.load('auth2', () => {
          this.config = gapiService.getConfig().getClientConfig();
          this.auth = gapi.auth2.init(this.config);
        });
      });
  }

  ngOnInit(): void {
  }

  async onLoginClick() {
    await this.auth.signIn();
  }

  onInitializeClick() {
    ee.reset();
    ee.data.setCloudApiEnabled(true);
    ee.apiclient.setAppIdToken(this.token);
    // ee.data.setAuthToken(this.config.client_id, 'Bearer', this.token, 1000);
    ee.initialize(
      null,
      null,
      () => this.message$.next('EE API initialised'),
      error => this.message$.next(`EE initialization error: ${error}`)
    );
  }

  private getParamsObjectFromHash(): any {
    const hash = window.location.hash ? window.location.hash.split('#') : [];
    let toBeReturned = {};
    if (hash.length && hash[1].split('&').length) {
      toBeReturned = hash[1].split('&').reduce((acc, x) => {
        const toks = x.split('=');
        if (toks.length === 2) {
          acc[toks[0]] = toks[1];
        }
        return acc;
      }, {});
    }
    return Object.keys(toBeReturned).length ? toBeReturned : null;
  }
}
