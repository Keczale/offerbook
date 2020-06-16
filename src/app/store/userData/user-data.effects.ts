import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';



@Injectable()
export class UserDataEffects {



  constructor(private actions$: Actions) {}

  // loadState$=createEffect(()=>
  // this.actions$.pipe(
  //     ofType(loadStateFromData),
  //     switchMap(()=> this.dataServis.loadDefaultList()
  //     .pipe( map(task=> new TodoLoadDefaultSuccesAction({defaultList:task}))
          
  //     )
  //     )
  //     )
//)
}
