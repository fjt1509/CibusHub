import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ForumPostService} from '../../forum-posts/shared/forum-post.service';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {of} from 'rxjs';

describe('FileService', () => {
  let fireStorageMock: any;
  let service: FileService;
  let fireStoreMock: any;
  let refMock: any;
  let id: '1';

  beforeEach(() => {
    fireStoreMock = jasmine.createSpyObj('AngularFireStore', ['collection']);
    fireStorageMock = jasmine.createSpyObj('AngularFirestorage', ['ref'])
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL'])
    fireStorageMock.ref.and.returnValue(refMock);
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireStorageModule
      ],
      providers: [
        {provide: AngularFireStorage, useValue: fireStorageMock},
        {provide: AngularFirestore, useValue: fireStoreMock}
      ],

    });
    service = TestBed.get(FileService);

  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should call Firestorage once when calling getFileUrl', () => {
      service.getFileUrl(id);
      expect(fireStorageMock.ref).toHaveBeenCalledTimes(1);
  })


});
