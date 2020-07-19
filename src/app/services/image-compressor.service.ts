import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressorService {

	private _convertWidth: number = 600;

  constructor() { } 

  public compress(file: File, image, ima): Observable<any> {
console.log(ima)
		let width: number = 600; // Для масштабирования относительно ширины

		

		// const reader: FileReader = new FileReader();

		// reader.readAsDataURL(file);

		return Observable.create ((observer: any) => {

		// reader.onload = (ev: ProgressEvent<FileReader>) => {

			// const preImg: HTMLImageElement = new Image();
			// const preImgUrl: string = window.URL.createObjectURL(file);
			// preImg.src = preImgUrl;
			// (preImg.onload = () => {
			// 	const minSide: number = Math.min(preImg.width, preImg.height, this._convertWidth);
			// 	width = minSide;
			// 	alert(`ширина=${width}`)
			// 	URL.revokeObjectURL(preImgUrl);
				
			// const img: HTMLImageElement = document.createElement('img')
			const img: HTMLImageElement = ima.nativeElement;

			// img.width = width;
			// img.height = width;
			// img.style.objectFit = 'cover';

			// const imgUrl: string = window.URL.createObjectURL(file);
			// img.src = image;

			// (img.onload = () => {
				alert(`ширина=${img.width}`)
				alert(`dscjnf=${img.height}`)
				// URL.revokeObjectURL(imgUrl);
			const elem: HTMLCanvasElement = document.createElement('canvas'); // Use Angular's Renderer2 method

			// img.width > this._convertWidth ? width = this._convertWidth : width = img.width;

			const scaleFactor: number = width / img.width;

			elem.width = width;

			elem.height = img.height * scaleFactor;

			const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> elem.getContext('2d');

			ctx.drawImage(img, 0, 0, elem.width, elem.height);
			console.log('marker')

			ctx.canvas.toBlob(

			(blob: Blob) => {

				observer.next(

				new File([blob], file.name, {

				type: 'image/png',

				lastModified: Date.now(),

				}),

			);
			},

		'image/png',

		1,

		);

	

		// (reader.onerror = (error: ProgressEvent<FileReader>) => observer.error(error));


		// };
//   });
});
// });
  }
}
