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
  editing: boolean = false;
  enteredEntry: string = '';
  searchedKey: string;

  constructor(public db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.data = this.db.collection('dataHouse', ref => ref.orderBy('date', 'desc').limit(30)).valueChanges();
  }

  edit(keyIn: string) {
    this.searchedKey = keyIn;
    this.editing = true;
    this.data = this.db.collection('dataHouse', ref => ref.where('key', '==', keyIn)).valueChanges();
  }

  submit(nameIn: string, valueIn: string, codeIn: string) {
    this.editing = false;
    const currentDate = new Date();
    const formatted = nameIn.toLowerCase().replace(/,/g,' ').replace(/-/g,' ').replace('(', ' ').replace(')',' ');
    console.log(formatted);
    const nameInArray = formatted.split(' ');
    const keyArr: string[] = [];

    nameInArray.forEach(value => {
      keyArr.push(value);
    });

    const dataset = {
      key: nameIn,
      value: valueIn,
      type: '',
      code: codeIn,
      date: currentDate,
      index: currentDate.getMinutes(),
      keys: keyArr
    };

    const deleteList = this.db.collection('dataHouse', ref => ref.where('key', '==', this.searchedKey.toLowerCase()));
    console.log(deleteList);
    deleteList.get().subscribe(delList => delList.forEach(doc => doc.ref.delete()));

    this.db.collection('dataHouse').add(dataset);
    this.db.collection('editBackup').add(dataset);
    this.enteredEntry = 'Record formatted & updated: ' + formatted;
  }

  //deprecated
  search(input: string) {
    if (input) {
      this.data = this.db.collection('dataHouse', ref => ref.where('key', '>=', input.toLowerCase()).where('key', '<=', input.toLowerCase() + '\uf8ff')).valueChanges();
    }
    else {
      this.data = this.db.collection('dataHouse', ref => ref.orderBy('date', 'desc').limit(50)).valueChanges();
    }
  }

  searchKeyArray(input: string) {
    this.editing = false;
    if (input) {
      const formatted = input.replace('-',' ').replace(',',' ');
      const splitted = formatted.split(' ');
      console.log(splitted.length);

      switch(splitted.length) {
        case 1: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains', input.toLowerCase())).valueChanges();
          break;
        }

        case 2: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains', splitted[1].toLowerCase())).valueChanges();
          break;
        }
        case 3: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains-any', [splitted[1].toLowerCase(),splitted[2].toLowerCase()])).valueChanges();
          break;
        }

        case 4: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains-any', [splitted[1].toLowerCase(),splitted[2].toLowerCase(),splitted[3]
            .toLowerCase(),splitted[4].toLowerCase()])).valueChanges();
          break;
        }

        case 5: {
          this.data = this.db.collection('dataHouse', ref => ref.where('keys', 'array-contains-any', [splitted[1].toLowerCase(),splitted[2].toLowerCase(),splitted[3].toLowerCase()
            ,splitted[4],splitted[5]])).valueChanges();
          break;
        }
      }
    }
    else {
      this.data = this.db.collection('dataHouse', ref => ref.orderBy('date', 'desc').limit(50)).valueChanges();
    }
  }

  capitalize(input: string) {
    return input.substring(0, 1).toUpperCase() + input.substring(1);
  }

}
