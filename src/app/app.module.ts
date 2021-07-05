import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { GaugeModule } from 'angular-gauge'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component'
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { DetailsComponent } from './components/details/details.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';

@NgModule({
  declarations: [ // 声明使用的组件
    AppComponent, // App组件
    SearchBarComponent, // search 搜索组件
    HomeComponent, // Home 首页组件
    DetailsComponent, // 游戏详情组件
    GameTabsComponent // 游戏列表组件
  ],
  imports: [ // 声明组件用到的类
    BrowserModule, //  Angular 应用都需要的基础设施
    AppRoutingModule, // 路由组件
    BrowserAnimationsModule, // 动画
    HttpClientModule, // 客户端服务
    FormsModule, // 表单
    GaugeModule.forRoot(), //仪表盘
    MatFormFieldModule, // material UI组件库 FORM组件
    MatSelectModule, // material UI组件库 Select组件
    MatTabsModule, // material UI组件库 Tabs组件
    MatIconModule // material UI组件库 Icon组件
  ],
  providers: [ // 注入服务
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
