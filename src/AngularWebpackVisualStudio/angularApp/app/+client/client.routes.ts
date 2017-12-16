import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
    { path: 'client', component: ClientComponent }
];

export const ClientRoutes = RouterModule.forChild(routes);
