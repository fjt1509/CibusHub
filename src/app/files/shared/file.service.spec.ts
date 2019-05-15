import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ForumPostService} from '../../forum-posts/shared/forum-post.service';
import {AngularFireStorageModule} from '@angular/fire/storage';

describe('FileService', () => {
  let fireStoreMock: any;
  let service: FileService;
  let FileServiceMock: any;
  beforeEach(() => {
    FileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    fireStoreMock = jasmine.createSpyObj('AngularFirestore', ['ref'])
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireStorageModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: fireStoreMock},
        {provide: FileService, useValue: FileServiceMock}
      ],

    });
    service = TestBed.get(FileService);
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });



});
