import { UserRate } from './user.model';

export class Offer {
	constructor(
		public id: string = '',
		public requestId: string = '',
		public fromUserId: string = '',
		public fromUserName: string = '',
		public fromUserRating: RatingInOffer = null,
		public title: string = '',
		public description: string = '',
		public conditions: string = '',
		public category: string = '',
		public price: number = null,
		public photos: string[] = [null],
		public photoNames: string[] = [null],
		public dateCreating: number = null,
		public lastChange: number = null,
		public secondHand: boolean = false,
		public status: string = '', // accepted refused - уже без права изменений
		public rate: UserRate = null,
		public rateKey: string = '', // возвращаемый key от firebase.push
		// public special: string = '', // bonuses

	) {}
}

export enum OfferStatus {'opened', 'accepted', 'rejected', 'rewieved'}

export enum OfferFilterName {'all', 'active', 'responsed', 'rejected'}
export enum OfferFilterTitle {'Все', 'Активные', 'В работе', 'Отклонены'}
export interface RatingInOffer {
	rating: number;
	ratingQuantity: number;
	comments: string[];
}
