import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressorService {

	private _convertWidth: number = 600;

  constructor() { } 

  public compress(image: ElementRef, file: File): Observable<any> {
	  console.log('compressor')

		let width: number = null; // Для масштабирования относительно ширины

		// const reader: FileReader = new FileReader();

		// reader.readAsDataURL(file);

		return Observable.create ((observer: any) => {

		// reader.onload = (ev: ProgressEvent<FileReader>) => {

			const img: HTMLImageElement = image.nativeElement;

			// img.src = (ev.target as any).result;
			
				alert(img.width)
				alert(img.height)
			const elem: HTMLCanvasElement = document.createElement('canvas'); // Use Angular's Renderer2 method

			img.width > this._convertWidth ? width = this._convertWidth : width = img.width;

			const scaleFactor: number = width / img.width;

			elem.width = width;

			elem.height = img.height * scaleFactor;

			const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> elem.getContext('2d');

			ctx.drawImage(img, 0, 0, elem.width, elem.height);

			ctx.canvas.toBlob(

			(blob: Blob) => {

				observer.next(

				new File([blob], file.name, {

				type: 'image/jpeg',

				lastModified: Date.now(),

				}),

			);
			},

		'image/jpeg',

		1,

		);

	

		// (reader.onerror = (error: ProgressEvent<FileReader>) => observer.error(error));


		// };
  });
  }
}
