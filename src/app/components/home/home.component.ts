import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public page!: number;
  public games: Array<Game> | [] = [];
  private routeSub!: Subscription;
  private gameSub!: Subscription;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  
  isScroll: Boolean = false

  ngOnInit(): void {
    this.isScroll = false;
    var page = this.page? this.page : 1;
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        console.log(page);
        console.log('routeSub');
        this.searchGames('metacrit', page, params['game-search']);
      } else {
        this.searchGames('metacrit', page);
      }
    })  
    var thon = this;
    window.addEventListener('scroll', function() {
      if(window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight ){
        thon.isScroll = true;
        page = page + 1;
        thon.routeSub = thon.activatedRoute.params.subscribe((params: Params) => {
          if (params['game-search']) {
            console.log(page);
            thon.searchGames('metacrit', page, params['game-search']);
          } else {
            console.log(thon.isScroll);
            thon.searchGames('metacrit', page);
          }
        })
      }
    }, false);
  }

  searchGames(sort: string, page: number, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, page, search)
      .subscribe((gameList: APIResponse<Game>) => {
        console.log(this.isScroll);
        if (this.isScroll) {
          this.games = [...this.games, ...gameList.results];
          this.isScroll = false
          return;
        }
        this.games = gameList.results;
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe()
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }
}
