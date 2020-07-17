import { Request } from './request.model';
import { Offer } from './offer.model';

export class User {
	constructor(
		public id: string,
		public userName: string, // сделать верификацию на уник
		public email: string,
		public location: string,
		public userData: UserData,
		public userStatus: string, // registered or guest
		public userType: string, // byer seller or universal
		public userRequests: Request[], // order id's
		public requestsLastOffer: LastOffer[],
		public userOffers: Offer[], // offer id's
		public sellerCategories: string[],
		public sellerLocation: string[],
		public sellerRejectedRequests: string[],
		public sellerResponsedRequests: SellersResponsedRequests,
		public sellerLastLoadedRequest: string,
		public userRating: UserRating
	) {}
}

export interface UserData {
	name: string;
	// surname: number;
	telephone: string;
	adress?: string;
}
export interface SellerData {
name: string;

}

export interface LastOffer {
	request: string;
	lastOffer: string;
}

export interface SellersResponsedRequests{
	requestId: string[];
	requestRef: string[];
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


