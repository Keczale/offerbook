import { Injectable } from '@angular/core';
import { Store, select, } from '@ngrx/store';
import { UserState, inProgressAction, DataIsLoadingSelector, getCurrentUserAction, currentUserSelector, userSignOutAction, currentUserNameSelector, cleanEmailErrorLoginAction, getEmailErrorLoginAction, emailErrorSelector, getLogOutErrorAction, addSellerAction, userTypeSelector, removeSellerAction, loadCurrentUserAction, setSellerCategoriesAction, sellerCategoriesSelector, setUserLocationAction, setSellerLocationAction } from 'src/app/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { auth, database } from 'firebase';
import { User, UserTypes, UserRate } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

	private userBaseUrl: string = 'users';
  public users$: Observable<any[]>;

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
  ) {	}

  public loading(): void {
	this._store$.dispatch(inProgressAction());
  }

  public loadCurrentUserFromData(uid: any): void {
	database().ref(`${this.userBaseUrl}/${uid}`).once('value')
	.then((snapshot: database.DataSnapshot) => snapshot.val())
	.then((user: User) => {
	if (user) {this._store$
		.dispatch(loadCurrentUserAction({currentUser: user}));
	}
	else {console.log('there are no such user in DB. Evidently its a first sign in')
	}
	});
  }


  public userToStoreReg(name: any, userData: any): void {
	const userName: string = userData.user.displayName ? userData.user.displayName : name;
	this._store$.dispatch(getCurrentUserAction({id: userData.user.uid, name: userName, email: userData.user.email}));
  }

  public userToStoreAndBaseLogInGoogle(): void {
	const user: firebase.User = auth().currentUser;
	database().ref(`${this.userBaseUrl}/${user.uid}`).once('value').then((snap: any) => {
		if (snap.val()) {
		database().ref(`${this.userBaseUrl}/${user.uid}/userName`).set(user.displayName);
	}
		else {
		this._store$.dispatch(getCurrentUserAction({id: user.uid, name: user.displayName, email: user.email}));
		this._store$.pipe(select(currentUserSelector))
		.subscribe((currentUser: User) =>
		database().ref(`${this.userBaseUrl}/${user.uid}`).set(currentUser)).
		unsubscribe();
	} }
	);
	}


	public setUserLocation(city: string): void{
		this._store$.dispatch(setUserLocationAction({userLocation: city}));
		this._store$.dispatch(setSellerLocationAction({sellerCities: [city]}));
		this.userToDataBase();
	}

	public userToDataBase(): void {
		this.onUserSubscription = this._store$.pipe(select(currentUserSelector))
		.subscribe((user: User) => database().ref(`${this.userBaseUrl}/${user.id}`).set(user)).unsubscribe();
	}

  public createUser(name: any, email: any, password: any): void {
	this.loading();
	this._afAuth.createUserWithEmailAndPassword(email, password)
	.then((userData: auth.UserCredential) => this.userToStoreReg(name, userData))
	.then(() => this.userToDataBase())
	.then(() => this.loading())
	.then(() => this._router.navigate(['']))
	.catch((error: Error) => {
		console.log(error);
		this.loading();
	});
  }

  public signInEmail(email: any, password: any): void {
	this.loading();
	this._afAuth.signInWithEmailAndPassword(email, password)
	.then(() => this._store$.dispatch(cleanEmailErrorLoginAction()))
	.then(() => this.loading())
	.then(() => this._router.navigate(['']))
	.catch((error: Error) => {
		this._store$.dispatch(getEmailErrorLoginAction({emailError: error.message}));
		this.loading();
	});
  }

  public signInGoogle(): void {
	this.loading();
	this._afAuth.signInWithPopup(new auth.GoogleAuthProvider())
	.then(() => {this.userToStoreAndBaseLogInGoogle(); this.inGoogleError = null;
	})
	.then(() => this.loading())
	.then(() => this._router.navigate(['']))
	.catch((error: Error) => {
		this.loading();
		this.inGoogleError = error.message;
	});
  }

  public signOut(): void {
	this.loading();
	this._afAuth.signOut()
	//.then(() => this._store$.dispatch(userSignOutAction())) 
	.then(() => {this.loading(); this.logOutError = null;
	})
	.then(() => this._router.navigate(['/login']))
	.catch((error: Error) => {
		this._store$.dispatch(getLogOutErrorAction({logOutError: error.message}));
		this.loading();
	});
  }

  public resetPasswordInit(email: string): Promise<void> {
	return this._afAuth.sendPasswordResetEmail(
	email,
	{ url: 'http://localhost:4200/login' });
	}

	public addSeller(userType: string): void {
		if (userType === UserTypes[0]) {
			this._store$.dispatch(addSellerAction());
			database().ref(`${this.userBaseUrl}/${auth().currentUser.uid}/userType`).set(UserTypes[1]);
		}
		else if (userType === UserTypes[1]) {
			this._store$.dispatch(removeSellerAction());
			database().ref(`${this.userBaseUrl}/${auth().currentUser.uid}/userType`).set(UserTypes[0]);
		}
	}

	public setUserCategories(sellerCategories: string[]): void {
		this._store$.dispatch(setSellerCategoriesAction({sellerCategories}));
		this.userToDataBase();
	}
	public setSellerCities(sellerCities: string[]): void {
		this._store$.dispatch(setSellerLocationAction({sellerCities}));
		this.userToDataBase();
	}

	public sendSellerRateToDatabase(sellerId: string, rate: UserRate, key: string): Promise<any> {
		return database().ref(`${this.userBaseUrl}/${sellerId}/sellerRating/${key}`).set(rate)
		.catch((error: Error) => console.log(error));
	}

}
