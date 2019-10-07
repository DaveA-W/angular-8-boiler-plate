import { NgModule } from '@angular/core';
import { EarthEngineRoutingModule } from './earth-engine-routing.module';
import * as ee from '@google/earthengine';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '347089355518-p1iom9gba13c1b0ollv4aqm95fr98dkb.apps.googleusercontent.com',
  discoveryDocs: ['https://earthengine.googleapis.com/$discovery/rest'],
  scope: `${ee.apiclient.AUTH_SCOPE}.readonly`,
  fetch_basic_profile: false,
  ux_mode: 'redirect',
  redirect_uri: 'http://localhost:4400/home/ee/test'
};

@NgModule({
  declarations: [],
  imports: [
    EarthEngineRoutingModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ]
})
export class EarthEngineModule {

}
