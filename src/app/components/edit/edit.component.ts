import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataModel} from '../../models/data.model';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  data: Observable<DataModel[]>;
  enteredEntry: string;
  searchedKey: string;

  constructor(public db: AngularFirestore) {
  }

  ngOnInit(): void {

  }

  edit(keyIn: string) {
    this.searchedKey = keyIn;
    this.data = this.db.collection('dataHouse', ref => ref.where('key', '==', keyIn)).valueChanges();
  }

  submit(nameIn: string, valueIn: string, codeIn: string) {
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
}
