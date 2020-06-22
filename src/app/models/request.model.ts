import { Offer } from './offer.model';

export class Request {
	constructor(
		public id: string = '',
		public fromUser: string = '',
		public title: string = '',
		public description: string = '',
		public category: string = '',
		public dateCreating: Date = null,
		// public viewed: number, // how much sellers open request , or boolean
		public photos: string[] = [], // src images
		public status: string = '', // active done
		public deleted: boolean = false,
		// public changed: Date, // when was las change
		// public dealedOffers: DealedOffer,
		public offers: Offer[] = [], //refers to offers
		) {}
}
interface DealedOffer {
	id: string;
	seller: number;
}
