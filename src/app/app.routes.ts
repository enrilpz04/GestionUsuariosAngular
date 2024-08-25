import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { UserformComponent } from './pages/userform/userform.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user/:id', component: UserprofileComponent },
    { path: 'newuser', component: UserformComponent},
    { path: 'updateuser/:id', component: UserformComponent},
    { path: '**', redirectTo: 'home' }
];
