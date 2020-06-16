export class Offer {
	constructor(
		private _id: string,
		public userName: string, // сделать верификацию на уник
		public title: string, // ???
		public orderAdress: string, // userId.rders,orderID
		public description: string, // registered or guest
		public deliverConditions: string,
		public price: number,
		public special: string, // bonuses
		public status: string, // accepted refused - уже без права изменений
		public comment: string  // коментарий, который можно оставить после покупки - будут у продавца в ленте собираться с указанием сделки

	) {}
}
