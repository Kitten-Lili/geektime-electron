import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { env } from 'process';
import { environment as env } from 'src/environments/environment'
import { forkJoin, Observable } from 'rxjs';
import { APIResponse, Game } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // 注入全局服务
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList( // 创建获取游戏列表服务功能
    ordering: string, // 必传, 游戏列表
    page: number, //必传， 页码
    search?: string  // 搜索值, 选传, 根据搜索值来获取游戏列表数据
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering).set('page',page) // 传递参数
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('page',page).set('search', search) // 如果有搜索内容则,加上搜索内容
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, { // GET请求url地址
      params: params // 传递参数
    })
  }

  getGameDetails(id: string): Observable<Game> { // 获取游戏详情
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`) // GET请求游戏详情
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies` // GET请求游戏截图
    )
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots` // GET请求游戏视频
    )
    return forkJoin ({ // 返回一个对象,包含3个请求结果对象
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results
        }
      })
    )
  }
}
