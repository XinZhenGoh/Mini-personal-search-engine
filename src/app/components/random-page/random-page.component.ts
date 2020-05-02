import {Component, OnInit} from '@angular/core';
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

  // deprecated
  search(input: string) {
    if (input) {
      this.data = this.db.collection('dataHouse', ref => ref.where('key', '>=', input.toLowerCase()).where('key', '<=', input.toLowerCase() + '\uf8ff')).valueChanges();
    } else {
      this.data = this.db.collection('dataHouse', ref => ref.where('index', '==', this.getRandomInt(60)).limit(50)).valueChanges();
    }
  }

  searchKeyArray(input: string) {
    if (input) {
      const formatted = input.replace('-', ' ').replace(',', ' ');
      const splitted = formatted.split(' ');
      console.log(splitted.length);

      switch (splitted.length) {
        case 1: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains', input.toLowerCase())).valueChanges();
          break;
        }

        case 2: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains', splitted[1].toLowerCase())).valueChanges();
          break;
        }
        case 3: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains-any', [splitted[1].toLowerCase(), splitted[2]
            .toLowerCase()])).valueChanges();
          break;
        }

        case 4: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains-any', [splitted[1].toLowerCase(), splitted[2]
            .toLowerCase(), splitted[3]
            .toLowerCase(), splitted[4].toLowerCase()])).valueChanges();
          break;
        }

        case 5: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains-any', [splitted[1].toLowerCase(), splitted[2]
            .toLowerCase(), splitted[3].toLowerCase()
            , splitted[4], splitted[5]])).valueChanges();
          break;
        }
      }
    } else {
      this.data = this.db.collection('dataHouse', ref => ref.where('index', '==', this.getRandomInt(60))).valueChanges();
    }
  }

  getRandomInt(input: number): number {
    return Math.floor(Math.random() * Math.floor(input));
  }

  capitalize(input: string) {
    return input.substring(0, 1).toUpperCase() + input.substring(1);
  }
}
