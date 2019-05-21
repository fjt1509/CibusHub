import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngxs/store';
import {catchError, switchMap, take} from 'rxjs/operators';
import {GetPosts} from '../post.action';
import {PostState} from '../post.state';


@Injectable({
  providedIn: 'root'
})
export class StoreGuard implements CanActivate {
  postsLoaded: Observable<boolean>;

  constructor(private store: Store) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(PostState.isLoaded).pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          return this.store.dispatch(new GetPosts());
        }
        return of(true);
      }),
      take(1)
    );
  }
}
