import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './ngrx/app.reducer';
import { FetchEmailsAction } from './ngrx/app.actions';;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-email-inbox';
  @Input() readMail: number = ["isRead == true"].filter(v => v).length;
  ngOnInit() {
    this.store.dispatch(FetchEmailsAction());
  }

  constructor(private store: Store<AppState>) {}
}
