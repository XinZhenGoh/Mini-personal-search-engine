import { Component, OnInit } from '@angular/core';
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

  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {

  }

  edit(keyIn: string) {
    this.data = this.db.collection('codeConcepts', ref => ref.where('key', '==', keyIn.toLowerCase())).valueChanges();
  }

  submit(nameIn: string, valueIn: string, codeIn: string) {
    const currentDate = new Date();
    const dataset = {
      key: nameIn.toLowerCase(),
      value: valueIn,
      type: '',
      code: codeIn,
      date: currentDate,
      index: currentDate.getMinutes()
    };

    const deleteList = this.db.collection('codeConcepts', ref => ref.where('key', '==', nameIn.toLowerCase()));
    deleteList.get().subscribe(delitems => delitems.forEach(doc => doc.ref.delete()));

    this.db.collection('codeConcepts').add(dataset);
    this.enteredEntry = 'Record updated: ' + nameIn;
  }

}
