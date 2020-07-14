export const productCategories: string[] = [
	'auto moto',
	'food',
	'mens wear',
	'woman wear',
	'home and garden'
];

export const userLocation = ['Могилёв', 'Минск', 'Брест', 'Гродно', 'Гомель', 'Витебск'];

export interface Breakpoints {
	mobilePortrait: number;
	mobile: number;
	tabletPortrait: number;
	tablet: number;
	laptop: number;
	desktop: number;
}
export const breakpoints: Breakpoints = {
	mobilePortrait: 470,
	mobile: 610,
	tabletPortrait: 768,
	tablet: 1000,
	laptop: 1400,
	desktop: 1680
}

// export const location = {
// 	Belarus: ['Беларусь', 'Могилёв', 'Минск', 'Брест', 'Гродно', 'Гомель', 'Витебск']
// }
export enum MainToggle {'Продать', 'Купить'}
