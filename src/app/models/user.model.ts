import { Request } from './request.model';
import { Offer } from './offer.model';

export class User {
	constructor(
		public id: string,
		public userName: string, // сделать верификацию на уник
		public email: string,
		public location: Location,
		public userData: UserData,
		public userStatus: string, // registered or guest
		public userType: string, // byer seller or universal
		public userRequests: Request[], // order id's
		public userOffers: Offer[], // offer id's
		public sellerCategories: string[],
		public userRating: UserRating
	) {}
}

interface UserData {
	name: string;
	surname: number;
	birthDay: string;
}

interface Location {
	country: string;
	city: string;
}

interface UserRating {
	buyer: number;
	seller: number;
}

export enum UserTypes {'buyer', 'seller'}

export enum productCategories {'auto/moto', 'seller'}

