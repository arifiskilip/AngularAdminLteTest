import { Routes, CanDeactivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ExamplesComponent } from './components/examples/examples.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { LoginVerificationCodeComponent } from './components/login-verification-code/login-verification-code.component';
import { FormGuard } from './guards/form-guard.guard';

export const routes: Routes = [
    {
        path:"admin",
        component:AdminLayoutComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: LayoutsComponent,
        canActivateChild: [()=> inject(AuthService).isAuthenticated()],
        children: [
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "examples",
                component: ExamplesComponent,
                canDeactivate:[FormGuard]
            },
        ]
    },
    {
        path:"verificationcode",
        component:LoginVerificationCodeComponent,
        canActivate: [()=> inject(AuthService).isAuthenticated()]
    },
];
