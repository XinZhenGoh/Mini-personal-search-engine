import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {DataModel} from '../../models/data.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-general-result-page',
  templateUrl: './general-result-page.component.html',
  styleUrls: ['./general-result-page.component.scss']
})
export class GeneralResultPageComponent implements OnInit {

  constructor(public db: AngularFirestore) {
  }
  data: Observable<DataModel[]>;
  size: number;
c;

  ngOnInit(): void {
    this.data = this.db.collection('vocabulary', ref => ref.orderBy('date', 'desc').limit(5)).valueChanges();
  }

  search(input: string) {
    this.data = this.db.collection('vocabulary', ref => ref.where('key', '>=', input.toLowerCase()).where('key', '<=', input.toLowerCase() + '\uf8ff')).valueChanges();
  }

  capitalize(input: string) {
    return input.substring(0, 1).toUpperCase() + input.substring(1);
  }
}
