import { Injectable } from '@angular/core';
import {FileMetadata} from './file.model';
import {defer, from, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {ImageMetaData} from './image-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }


  getFileUrl(id: string): Observable<any> {
    return this.storage.ref('post-pictures/' + id).getDownloadURL();
  }

}
