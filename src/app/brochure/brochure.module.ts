import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { WordpressService } from './providers/wordpress.service';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';
import { PageComponent } from './page/page.component';
import { DegreePageComponent } from './degree-page/degree-page.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    PostComponent,
    PageComponent,
    DegreePageComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
      path: 'brochure',
        component: HomeComponent,
        ///canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            component: HomeComponent,
          },
          {
            path: 'list',
            component: ListComponent,
          },
          { 
            path: 'category-list', 
            component: CategoryListComponent,
          },
          { 
            path: 'post', 
            component: PostComponent,
          },
          { 
            path: 'page/:id', 
            component: PageComponent, 
          },
          { 
            path: 'degree-page/:id/:gal/:cur', 
            component: DegreePageComponent, 
          }        
        ]
      }
    ])
  ],
  providers: [
    WordpressService
  ]
})
export class BrochureModule { }
