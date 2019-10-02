import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TestComponent } from './test/test.component';

const eeRoutes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: 'test', pathMatch: 'full' }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(eeRoutes)],
  declarations: [TestComponent],
  exports: [RouterModule]
})
export class EarthEngineRoutingModule {}
