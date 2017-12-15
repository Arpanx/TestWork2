import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: 'client', component: HomeComponent }
];

export const HomeRoutes = RouterModule.forChild(routes);
