import { Component, OnInit, Input } from '@angular/core';
import { Request } from 'src/app/models/request.model';


@Component({
  selector: 'app-actual-request',
  templateUrl: './actual-request.component.html',
  styleUrls: ['./actual-request.component.scss']
})
export class ActualRequestComponent implements OnInit {

  constructor() { }

  @Input()
  public request: Request;

  @Input()
  public index: Request;

  ngOnInit(): void {
    console.log(this.request.title)
  }

}
