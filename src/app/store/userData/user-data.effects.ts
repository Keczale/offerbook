import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsUser from './user-data.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { database } from 'firebase';



@Injectable()
export class UserDataEffects {

  // public loadCurrentUser$ = createEffect(()=>
  // this._actions$.pipe(
  //   ofType<any>(ActionsUser.getCurrentUserInitAction),
  //   switchMap(()=>)
  // )
  //     )

  // public loadCurrentUserFromData(uid: any): void {
  //   con
  //   database().ref(`users/${uid}`).once('value')
  //   .then((snapshot: database.DataSnapshot) => snapshot.val())
  //   .then((user: any) => this._store$.dispatch(getCurrentUserAction({id: user.id, name: user.userName, email: user.email})));
  
  //   }

  constructor(
    private _actions$: Actions,
    private _afAuth: AngularFireAuth,
    ) {}



}
