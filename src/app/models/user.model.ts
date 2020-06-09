export class User {
	constructor(
		private _id: string,
		private _userName: string, // сделать верификацию на уник
		public password: string,
		public location: Location,
		public userData: UserData,
		public userStatus: string, // registered or guest
		public userType: string, // byer seller or universal
		public userOrders: string[], // order id's
		public iserOffers: string[], // offer id's
		public sellersCategory: string[],
		public userRating: UserRating
	) {}
	public set userName(name: string) {
		this._userName = name; // надо реализовать проверку из массива юзеров на уникальность
	}
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
