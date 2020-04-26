import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {DataModel} from '../../models/data.model';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  data: Observable<DataModel[]>;

  constructor(public db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.data = this.db.collection('codeConcepts', ref => ref.orderBy('date', 'desc').limit(30)).valueChanges();
  }

  search(input: string) {
    if (input) {
      this.data = this.db.collection('codeConcepts', ref => ref.where('key', '>=', input.toLowerCase()).where('key', '<=', input.toLowerCase() + '\uf8ff')).valueChanges();
    }
    else {
      this.data = this.db.collection('codeConcepts', ref => ref.orderBy('date', 'desc').limit(30)).valueChanges();
    }
  }

  capitalize(input: string) {
    return input.substring(0, 1).toUpperCase() + input.substring(1);
  }
}
