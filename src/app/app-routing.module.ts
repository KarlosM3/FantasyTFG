import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './features/players/players.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/leagues/leagues.module').then(m => m.LeaguesModule)
  },
  { path: 'mercado', component: PlayersComponent

  },

  {
    path: 'clasificacion',
    redirectTo: '', // Temporalmente redirige a la página principal
    pathMatch: 'full'
  },
  {
    path: 'mas',
    redirectTo: '', // Temporalmente redirige a la página principal
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
