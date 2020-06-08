import { Offer } from './offer.model';

export class Order {
	constructor(
		public id: string,
		public fromUser: string,
		public title: string,
		public description: string,
		public date: Date,
		public viewed: number, // how much sellers open request , or boolean
		public photos: string[], // src images
		public status: string, // active done
		public deleted: string,
		public changed: Date, // when was las change
		public dealedOffer: DealedOffer,
		public offers: Offer[],
		) {}
}
interface DealedOffer {
	id: string;
	seller: number;
}
