import { Injectable } from '@angular/core';
import { Store, select, } from '@ngrx/store';
import { UserState, inProgressAction, DataIsLoadingSelector, getCurrentUserAction, currentUserSelector, userSignOutAction, currentUserNameSelector, cleanEmailErrorLoginAction, getEmailErrorLoginAction, emailErrorSelector, getLogOutErrorAction, addSellerAction, userTypeSelector, removeSellerAction, loadCurrentUserAction, setSellerCategoriesAction, sellerCategoriesSelector, setUserLocationAction, setSellerLocationAction } from 'src/app/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

import { auth, database } from 'firebase';
import { User, UserTypes } from 'src/app/models/user.model';
// import { UserDataFacade } from 'src/app/store/userData/user-data.facade';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // public isLoading: boolean;

  public users$: Observable<any[]>;

  //public userName = 'user';
  // public userName$: Observable<string> = this._store$.pipe(select(currentUserNameSelector));
  public isLoading$: Observable<boolean> = this._store$.pipe(select(DataIsLoadingSelector));

  public userType$: Observable<string> = this._store$.pipe(select(userTypeSelector));
  public currentUser$: Observable<User> = this._store$.pipe(select(currentUserSelector));

  public onUserSubscription: any;
  public sellerCategories$: Observable<string[]> = this._store$.pipe(select(sellerCategoriesSelector))

  public inEmailError$: Observable<string> = this. _store$.pipe(select(emailErrorSelector));
  public inGoogleError: string;
  public logOutError: string;

constructor(
	private _store$: Store<UserState>,
	private _afAuth: AngularFireAuth,
	private _router: Router,
	public db: AngularFireDatabase,
	  // public dataService: DataService,
  ) {	}

  public loading(): void {
	this._store$.dispatch(inProgressAction());
	// this._store$.pipe(select(DataIsLoadingSelector)).subscribe((boo: boolean) => this.isLoading = boo);
  }
//   public getUserName(uid: any): void {
// 	console.log(auth().currentUser.uid);
// 	database().ref(`users/${uid}`).once('value').then(snapshot => {this.userName = snapshot.val().userName});
// 	//this.db.list(`user/${auth().currentUser.uid}`).snapshotChanges()
// 	//.subscribe(a => console.log(a)); //database().ref(`users/${auth().currentUser.uid}`).once:'unlogined';
// }
  public loadCurrentUserFromData(uid: any): void {
	database().ref(`users/${uid}`).once('value')
	.then((snapshot: database.DataSnapshot) => snapshot.val())
	.then((user: User) => {
	if (user) {this._store$
		.dispatch(loadCurrentUserAction({id: user.id, name: user.userName,
			email: user.email, userType: user.userType, sellerCategories : user.sellerCategories,
			sellerLocation: user.sellerLocation, userLocation: user.location}));
	}
	else {console.log('there are no such user in DB. Evidently its a first sign in')}
	});
  }


  public userToStoreReg(name: any, userData: any): void {
	const userName: string = userData.user.displayName ? userData.user.displayName : name;
	this._store$.dispatch(getCurrentUserAction({id: userData.user.uid, name: userName, email: userData.user.email}));
  }

//   public userToStoreLogInEmail(): void {
// 	const id: string = auth().currentUser.uid;
// 	database().ref(`users/${id}`).once('value')
// 	.then((snapshot: database.DataSnapshot) => snapshot.val())
// 	// отдает массив всех юзеров const a = database().ref(`user/`).once('value').then(snapshot => {console.log(snapshot.val())});
// 	.then((user: any) => this._store$.dispatch(getCurrentUserAction({id: user.id, name: user.userName, email: user.email})));
//   }

  public userToStoreAndBaseLogInGoogle(): void {
	const user: firebase.User = auth().currentUser;
	database().ref(`users/${user.uid}`).once('value').then((snap: any) =>
		{ if (snap.val()){
		database().ref(`users/${user.uid}/userName`).set(user.displayName)
	}
		else {
		this._store$.dispatch(getCurrentUserAction({id: user.uid, name: user.displayName, email: user.email}));
		this._store$.pipe(select(currentUserSelector))
		.subscribe((currentUser: User) =>
		database().ref(`users/${user.uid}`).set(currentUser)).
		unsubscribe()} }
	)}
	
	// this._store$.pipe(select(currentUserSelector))
	// 	.subscribe((currentUser: User) =>
	// 	database().ref(`users/${currentUser.id}`).once('value').then((snap: any) => 
	// 	{ if (snap.val()){
	// 		console.log(snap.val())
	// 	//database().ref(`users/${user.id}/userName`).set(user.userName)
	// }
	// 	else {
	// 	console.log('no')
	// 	database().ref(`users/${currentUser.id}`).set(user)} } ) )
	// 	.unsubscribe();
	//  }

	public setUserLocation(city: string): void{
		this._store$.dispatch(setUserLocationAction({userLocation: city}));
		this._store$.dispatch(setSellerLocationAction({sellerCities:[city]}));
		this.userToDataBaseReg();
	}

	public userToDataBaseReg(): void {
		this.onUserSubscription = this._store$.pipe(select(currentUserSelector))
		.subscribe((user: User) => database().ref(`users/${user.id}`).set(user)).unsubscribe();
	}

  public createUser(name: any, email: any, password: any): void {
	this.loading();
	this._afAuth.createUserWithEmailAndPassword(email, password)
	.then((userData: auth.UserCredential) => this.userToStoreReg(name, userData))
	.then(() => this.userToDataBaseReg())
	.then(() => this.loading())
	.then(() => this._router.navigate(['']))
  }

  public signInEmail(email: any, password: any): void {
	this.loading();
	this._afAuth.signInWithEmailAndPassword(email, password)
	.then(() => this._store$.dispatch(cleanEmailErrorLoginAction()))
	.catch((error: any) => this._store$.dispatch(getEmailErrorLoginAction({emailError: error.message})))
	.then(() => this.loading())
	.then(() => this._router.navigate(['']))
	;
  }

  public signInGoogle(): void {
	this.loading();
	this._afAuth.signInWithPopup(new auth.GoogleAuthProvider())
	// .then(() => this.userToDataBaseReg())
	// .then(() => this.onUserSubscription.unsubscribe())
	.then(() => {this.userToStoreAndBaseLogInGoogle(); this.inGoogleError = null;
	})
	.catch((error: any) => this.inGoogleError = error.message)
	.then(() => this.loading())
	.then(() => this._router.navigate(['']), () => this.loading())
	;
  }
  public signOut(): void {
	this.loading();
	this._afAuth.signOut()
	.then(() => {this.loading(); this.logOutError = null;
	})
	.catch((error: any) => this._store$.dispatch(getLogOutErrorAction({logOutError: error.message})))
	.then(() => this._router.navigate(['/login']));
	this._store$.dispatch(userSignOutAction());
  }
  public resetPasswordInit(email: string): Promise<void> {
	return this._afAuth.sendPasswordResetEmail(
	email,
	{ url: 'http://localhost:4200/login' });
	}

	public addSeller(userType: string): void {
		if (userType === UserTypes[0]) {
			this._store$.dispatch(addSellerAction());
			database().ref(`users/${auth().currentUser.uid}/userType`).set(UserTypes[1]);
		}
		else if (userType === UserTypes[1]) {
			this._store$.dispatch(removeSellerAction());
			database().ref(`users/${auth().currentUser.uid}/userType`).set(UserTypes[0]);
		}

	}

	public setUserCategories(sellerCategories: string[]): void {
		this._store$.dispatch(setSellerCategoriesAction({sellerCategories}));
		this.userToDataBaseReg()
	}
	public setSellerCities(sellerCities: string[]): void {
		this._store$.dispatch(setSellerLocationAction({sellerCities}));
		this.userToDataBaseReg();
	}

}
