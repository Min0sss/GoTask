import { Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { StatsComponent } from './components/stats/stats.component';

export const appRoutes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'stats', component: StatsComponent },
  {
    path: 'archived',
    loadComponent: () =>
      import('./components/archived/archived.component').then(m => m.ArchivedComponent)
  },
  { path: '**', redirectTo: '' }
];
