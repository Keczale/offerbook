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
		public buyerRating: UserRate[],
		public sellerRating: UserRate[]

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

export interface SellersResponsedRequests {
	requestId: string[];
	requestRef: string[];
}

interface Location {
	country: string;
	city: string;
}

export interface UserRate {
	rate: number;
	id: string;
	title: string;
	comment: string;
}

export enum UserTypes {'buyer', 'seller'}

export interface RateFromForm {
	title: number;
	description: string;
	icon: string;
}

export const rateSelection: RateFromForm[] = [
	{title: 1, description: 'Совсем беда', icon: 'mood_bad'},
	{title: 2, description: 'Плохо', icon: 'sentiment_very_dissatisfied'},
	{title: 3, description: 'Так себе', icon: 'sentiment_dissatisfied'},
	{title: 4, description: 'Хорошо', icon: 'sentiment_satisfied'},
	{title: 5, description: 'Просто супер!', icon: 'sentiment_very_satisfied'}
]
