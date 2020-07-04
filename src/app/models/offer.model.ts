export class Offer {
	constructor(
		public id: string = '',
		public requestId: string = '',
		public fromUserId: string = '',
		public fromUserName: string = '',
		public fromUserRating: number = null,
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
		public comment: string = ''  // коментарий, который можно оставить после покупки - будут у продавца в ленте собираться с указанием сделки
		// public special: string = '', // bonuses

	) {}
}

export enum OfferStatus {'opened', 'accepted', 'refused'}

export enum OfferFilterName {'all', 'active', 'responsed', 'rejected'}

