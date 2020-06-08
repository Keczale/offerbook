export class User {
	constructor(
		private _id: string,
		private _userName: string, // сделать верификацию на уник
		public password: string,
		public userStatus: string, // registered or guest
		public userType: string, // byer seller or universal
		public sellersCategory: string[],
		public userRating: UserRating
	) {}
	public set userName(name: string) {
		this._userName = name; // надо реализовать проверку из массива юзеров на уникальность
	}
}

interface UserRating {
	buyer: number;
	seller: number;
}
