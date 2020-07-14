import { Offer } from './offer.model';

export class Request {
	constructor(
		public id: string = '',
		public fromUser: string = '',
		public fromUserName: string = '',
		public fromUserRating: number = null,
		public title: string = '',
		public description: string = '',
		public category: string = '',
		public city: string = '',
		public secondHand: boolean = false,
		public dateCreating: number = null,
		public lastChange: number = null,
		// public viewed: number, // how much sellers open request , or boolean
		public photos: string[] = [], // src images
		public photoNames: string[]= [],
		public status: string = '', // active done
		public deleted: boolean = false,
		public offers: object = {},
		public newOffersToRequest: number = null,
		public acceptedSellerId: string = ''
		) {}
}
interface DealedOffer {
	id: string;
	seller: number;
}

export enum RequestStatus {'active', 'completed'}
export enum RequestFilterName {'all', 'active', 'completed'}
export enum RequestFilterTitle {'Все', 'Активные', 'Завершенные'}
