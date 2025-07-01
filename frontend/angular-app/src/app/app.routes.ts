import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTypeFormComponent } from './components/user-type-form/user-type-form.component';
import { HomeComponent } from './components/home/home.component';
import { UserTypeListComponent } from './components/user-type-list/user-type-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'userTypes', component: UserTypeListComponent },
  { path: 'userTypes/add', component: UserTypeFormComponent },
  { path: 'userTypes/edit/:id', component: UserTypeFormComponent },
];
