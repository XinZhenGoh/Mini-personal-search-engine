import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataModel} from '../../models/data.model';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-random-page',
  templateUrl: './random-page.component.html',
  styleUrls: ['./random-page.component.scss']
})
export class RandomPageComponent implements OnInit {
  data: Observable<DataModel[]>;

  constructor(public db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.data = this.db.collection('dataHouse', ref => ref.orderBy('date', 'desc').limit(50)).valueChanges();
  }

  search(input: string) {
    if (input) {
      this.data = this.db.collection('dataHouse', ref => ref.where('key', '>=', input.toLowerCase()).where('key', '<=', input.toLowerCase() + '\uf8ff')).valueChanges();
    }
    else {
      this.data = this.db.collection('dataHouse', ref => ref.where('index', '==', this.getRandomInt(60)).limit(50)).valueChanges();
    }
  }

  getRandomInt(input: number): number {
    return Math.floor(Math.random() * Math.floor(input));
  }

  capitalize(input: string) {
    return input.substring(0, 1).toUpperCase() + input.substring(1);
  }
}
