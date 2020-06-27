import { Offer } from './offer.model';

export class Request {
	constructor(
		public id: string = '',
		public fromUser: string = '',
		public title: string = '',
		public description: string = '',
		public category: string = '',
		public city: string = '',
		public secondHand: boolean = false,
		public dateCreating: number = null,
		public lastChange: number = null,
		// public viewed: number, // how much sellers open request , or boolean
		public photos: string[] = [], // src images
		public photoNames: string[]=[],
		public status: string = '', // active done
		public deleted: boolean = false,
		// public changed: Date, // when was las change
		// public dealedOffers: DealedOffer,
		//public offers: Offer[] = [], //refers to offers
		) {}
}
interface DealedOffer {
	id: string;
	seller: number;
}

export enum requestStatus {'active', 'completed'}

