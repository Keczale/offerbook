import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { RequestDataService } from '../../services/request-data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Subscription, EMPTY, Subject } from 'rxjs';
import { userLocation } from 'src/app/models/common';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { Request } from 'src/app/models/request.model';
import { ImageCompressorService } from 'src/app/services/image-compressor.service';
import { takeUntil, expand, map } from 'rxjs/operators';

@Component({
  selector: 'app-request-change-popup',
  templateUrl: './request-change-popup.component.html',
  styleUrls: ['./request-change-popup.component.scss']
})
export class RequestChangePopupComponent implements OnInit, OnDestroy, AfterViewInit {

	private _requestSubscriber: Subscription;
  private _imageMaxSize: number = 500000;
  public requestChangeForm: FormGroup;
  public cityList: string[] = userLocation;

  public changedRequest: Request = null;


  private _citySubscriber: Subscription;
  private _ngUnsubscribe: Subject<any> = new Subject<any>();
private _compressedImages: File[] = [];
public requestForm: FormGroup;
public userCity: string = null;

public upFile: File[] = null;
  public photos64: string[] = [];
  public uploadFiles: File[] = [];
  public photoImgArray = [];


  constructor(
		public requestService: RequestService,
		public requestDataService: RequestDataService,
		public requestFacade: RequestFacade,
		private _fb: FormBuilder,
		private _compressor: ImageCompressorService,
		) { }

  ngOnInit(): void {
		this._requestSubscriber = this.requestFacade.changedRequest$.subscribe((request: Request) => this.changedRequest = request);
		this.requestChangeForm = this._fb.group({
			title : new FormControl(''),
			description : new FormControl(''),
			category : new FormControl(this.changedRequest.category),
			city : new FormControl(this.changedRequest.city),
			secondHand : new FormControl(this.changedRequest.secondHand),
			requestImage : new FormControl(), // null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
		});
  }
  @ViewChildren('photoImg')
		public photosImg: QueryList<any>;

	ngAfterViewInit (): void {
		this.photosImg.changes.pipe(takeUntil(this._ngUnsubscribe)).subscribe((images: HTMLImageElement[]) => {
			this.photoImgArray = [...images];
				} );
	}
  ngOnDestroy(): void {
		this._requestSubscriber.unsubscribe();
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
		
			recursiveCompress = (image: HTMLImageElement, index: number, array: any[], file: File) => {
		
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
				const formValue: any = this.requestChangeForm.value;
				if (Boolean(this._compressedImages.length)) {
					formValue.requestImage = {
						...formValue.requestImage,
						files : this._compressedImages
					}
					this.requestService.submitChangeForm(formValue);
					this._compressedImages = [];
				}
	
			})
			.catch((error: Error) => console.log(error));
	 }
		else { this.requestService.submitChangeForm(this.requestChangeForm.value);
		}
  }

  public cancelChanging(): void {
		this.requestService.cancelChanging();
  }
}
