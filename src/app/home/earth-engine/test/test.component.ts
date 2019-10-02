import * as ee from '@google/earthengine';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent {

  message$ = new BehaviorSubject<string>('EE test activated');

  onInitializeClick() {
    ee.reset();
    ee.data.setCloudApiEnabled(true);
    ee.data.authenticateViaPopup(
      () => ee.initialize(
              null,
              null,
              () => this.message$.next('EE API initialised'),
              error => this.message$.next(`EE initialization error: ${error}`)
            ),
      error => this.message$.next(`Google authentication error: ${error}`)
    );
  }
}
