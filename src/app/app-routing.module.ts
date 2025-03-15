import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) }, 
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule) }, 
  { path: 'form', loadChildren: () => import('./form/form.module').then( m => m.FormPageModule) }, 
  { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule) },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule) },
  {path: 'metas', loadChildren: () => import('./metas/metas.module').then( m => m.MetasPageModule)}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
