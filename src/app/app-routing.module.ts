import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [ // 路由
  {
    path: '', // 默认路由
    component: HomeComponent
  },
  {
    path: 'search/:game-search', // 搜索路由, 携带搜索的值
    component: HomeComponent
  },
  {
    path: 'details/:id', // 游戏详情页路由, 携带游戏id
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
