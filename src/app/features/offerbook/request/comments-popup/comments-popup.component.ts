import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserRate } from 'src/app/models/user.model';

@Component({
  selector: 'app-comments-popup',
  templateUrl: './comments-popup.component.html',
  styleUrls: ['./comments-popup.component.scss']
})
export class CommentsPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public rates: UserRate[]
    ) { }

  ngOnInit(): void {
  }

}
