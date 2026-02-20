import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing'
import { TripEditComponent } from './edit-trip/edit-trip';
import { Login } from './login/login';

export const routes: Routes = [
    { path: 'add-trip', component: AddTrip},
    { path: '', component: TripListing, pathMatch: 'full'},
    { path: 'login', component: Login},
    { path: 'edit-trip', component: TripEditComponent},
];
