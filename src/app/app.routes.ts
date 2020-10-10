import { Routes, RouterModule } from '@angular/router';
import { ImagesService } from './services/images.service';


const routes: Routes = [
    {  path: 'images', component: ImagesService},
    {  path: '**', pathMatch: 'full', redirectTo: 'images'},
    {  path: '', pathMatch: 'full', redirectTo: 'images'}
];

export const appRouting = RouterModule.forRoot(routes);