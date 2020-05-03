import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {DataModel} from '../../models/data.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  data: AngularFirestore;
  enteredEntry: string;

  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {

  }

  submit(nameIn: string, valueIn: string, codeIn: string) {
    const currentDate = new Date();
    const formatted = nameIn.toLowerCase().replace(/\s+$/, '').replace(/,/g,' ').replace(/-/g,' ').replace('(', ' ').replace(')',' ');
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

    if (nameIn){
      this.db.collection('dataHouse').add(dataset);

      this.enteredEntry = 'Record inserted(Formatted): ' + formatted;
    }
    else {
      this.enteredEntry = 'Record failed to insert';
    }
  }
}
