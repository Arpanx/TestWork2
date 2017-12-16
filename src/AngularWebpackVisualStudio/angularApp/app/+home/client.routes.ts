import { RouterModule, Routes } from '@angular/router';
import { clientComponent } from './client.component';

const routes: Routes = [
    { path: 'client', component: clientComponent }
];

export const clientRoutes = RouterModule.forChild(routes);
