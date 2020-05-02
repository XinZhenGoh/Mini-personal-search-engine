import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabComponent} from './tab/tab/tab.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ResultPageComponent} from './components/result-page/result-page.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { InputComponent } from './components/input/input.component';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {environment} from '../environments/environment';
import { AdminTabComponent } from './tab/admin-tab/admin-tab.component';
import { DeleteComponent } from './components/delete/delete.component';
import { EditComponent } from './components/edit/edit.component';
import { RandomPageComponent } from './components/random-page/random-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    ResultPageComponent,
    InputComponent,
    AdminTabComponent,
    DeleteComponent,
    EditComponent,
    RandomPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    NgMatSearchBarModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
