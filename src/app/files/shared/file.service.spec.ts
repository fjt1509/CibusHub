import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FileService', () => {
  let fireStoreMock: any;
  beforeEach(() => {
    fireStoreMock = jasmine.createSpyObj('AngularFirestore', ['collection'])
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: fireStoreMock}
      ]
    });
  });

});
