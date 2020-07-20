import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { OfferService } from '../../services/offer.service';
import { ImageCompressorService } from 'src/app/services/image-compressor.service';
import { takeUntil, map, expand } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Component({
  selector: 'app-offer-popup',
  templateUrl: './offer-popup.component.html',
  styleUrls: ['./offer-popup.component.scss']
})
export class OfferPopupComponent implements OnInit {
  // private _imageMaxSize: number = 500000;

	private _ngUnsubscribe: Subject<any> = new Subject<any>();
	private _compressedImages: File[] = [];

	public offerForm: FormGroup;

  public upFile: File[] = null;
	public photos64: string[] = [];
	public uploadFiles: File[] = [];
	public photoImgArray: HTMLImageElement[] = [];

	@ViewChildren('photoImg')
	public photosImg: QueryList<any>;

  constructor(
		public offerService: OfferService,
		private _compressor: ImageCompressorService,
		) { }

  ngOnInit(): void {
  this.offerForm = new FormGroup({
  description : new FormControl('', Validators.required),
	conditions : new FormControl(''),
  price : new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
	secondHand : new FormControl(),
	offerImage : new FormControl(), // null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
	});
  }


	ngAfterViewInit (): void {
		this.photosImg.changes.pipe(takeUntil(this._ngUnsubscribe)).subscribe((images: HTMLImageElement[]) => {
			this.photoImgArray = [...images];
				} );
	}

  ngOnDestroy(): void {
	this._ngUnsubscribe.next();
	this._ngUnsubscribe.complete();
  }

  public process (files: File[]): void {
		const reader: FileReader = new FileReader();
		const fileList: File[] = [...files];
		fileList.map((file: File) => {
			reader.readAsDataURL(files[0]);
			reader.onload = (ev: ProgressEvent<FileReader>) => {
				const imgUrl: string | ArrayBuffer = ev.target.result;
        // this.toCompress(files, imgUrl)
				this.uploadFiles = files;
				this.photos64 = [(String(imgUrl))]; //отображает только 1 фото
        // this.photos64.push(String(imgUrl));  для мульти фото
			};
		});
  }

	public recursiveCompress = (image: HTMLImageElement, index: number, array: any[], file: File) => {

		return this._compressor.compress(file, image).pipe (
			map(response => {
			this._compressedImages.push(response);
			return {
			data: response,
			index: index + 1,
			array: array,
			};
		}),
		);
	}
    // процесс загрузки файла

	public toCompress (files: File[]): Promise<File[]> {
	return new Promise ((resolve) => {

		const data = this.photoImgArray;
		const compress = this.recursiveCompress( data[0], 0, data, files[0]).pipe(
			expand(res => {
			return res.index > res.array.length - 1
				? EMPTY
				: this.recursiveCompress( data[res.index], res.data, data, files[res.index] );
			}),
		);
		compress.subscribe(res => {
			if (res.index > res.array.length - 1) {
			console.log('Compression successful');
			resolve(this._compressedImages);
			}
		});

	});
}

  public submitForm(): void {
		if ( Boolean(this.uploadFiles.length)) {
			this.toCompress(this.uploadFiles)
				.then(() => {
				const formValue: any = this.offerForm.value;
				if (Boolean(this._compressedImages.length)) {
					formValue.offerImage = {
						...formValue.offerImage,
						files : this._compressedImages
					}
					this.offerService.submitOfferForm(formValue);
					this._compressedImages = [];
				}

			})
			.catch((error: Error) => console.log(error));
   }
		else { this.offerService.submitOfferForm(this.offerForm.value);
		}
  }

}
