import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { userLocation } from 'src/app/models/common';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { Subscription, EMPTY } from 'rxjs';
import { ImageCompressorService } from 'src/app/services/image-compressor.service';
import { map, expand } from 'rxjs/operators';

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html',
  styleUrls: ['./request-popup.component.scss']
})
export class RequestPopupComponent implements OnInit, OnDestroy {

	private _citySubscriber: Subscription;
  private _imageMaxSize: number = 5000000;
  private _compressedImages: File[] = [];
  public requestForm: FormGroup;
  public cityList: string[] = userLocation;
  public userCity: string = null;

  constructor(
	public requestService: RequestService,
	public userDataFacade: UserDataFacade,
	private _fb: FormBuilder,
	private _compressor: ImageCompressorService

	) {   }

  ngOnInit(): void {
	this._citySubscriber = this.userDataFacade.userLocation$.subscribe((city: string) => this.userCity = city);
	this.requestForm = this._fb.group({
	title : new FormControl('', Validators.required),
	description : new FormControl('', Validators.required),
	category : new FormControl('', Validators.required),
	city : new FormControl(this.userCity, Validators.required),
	secondHand : new FormControl(),
	requestImage : new FormControl(null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
	});
  }
  ngOnDestroy(): void {
	this._citySubscriber.unsubscribe();
  }

  recursiveCompress = (image: File, index: number, array: any[]) => {

	return this._compressor.compress(image).pipe (
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

  public toCompress (originalImages: File[]): Promise<File[]> {
	return new Promise ((resolve) => {
		const data = originalImages;
		const compress = this.recursiveCompress( data[0], 0, data ).pipe(
		  expand(res => {
			return res.index > res.array.length - 1
			  ? EMPTY
			  : this.recursiveCompress( data[res.index], res.index, data );
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
	this.toCompress(this.requestForm.value.requestImage.files)
	.then((images: File[]) => {
		const formValue: any = this.requestForm.value;
		if (Boolean(images.length)) {
			formValue.requestImage.files.splice(0, 1, images[0]);
		}
		this.requestService.submitForm(formValue);
		this._compressedImages = [];
	})
	.catch((error: Error) => console.log(error))

  }

}
