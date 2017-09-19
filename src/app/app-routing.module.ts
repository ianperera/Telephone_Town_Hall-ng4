import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthService} from './services/auth';

import {HomePage} from './containers/home-page';
import {ModeratorPage} from './containers/moderator-page';
import {LoginPage} from './containers/login-page';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePage},
    {path: 'login', component: LoginPage},
    {
        path: 'control',
        canActivate: [AuthService],
        component: ModeratorPage
    },
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
