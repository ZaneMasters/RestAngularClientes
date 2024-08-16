import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './ingreso/ingreso.component';
import { ResumenComponent } from './resumen/resumen.component';

const routes: Routes = [
  { path: '', component: IngresoComponent },
  { path: 'resumen', component: ResumenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

