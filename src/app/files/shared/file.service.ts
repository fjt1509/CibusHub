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


/*
  uploadImage(imageMetadata: ImageMetaData): Observable<FileMetadata> {
    if (imageMetadata.imageBlob) {
      const fileToUpload = new File(
        [imageMetadata.imageBlob],
        imageMetadata.fileMeta.name
        , {type: imageMetadata.fileMeta.type});
      return this.upload(fileToUpload);
    }
  }*/

  upload(file: File): Observable<FileMetadata> {
    const uid = this.db.createId();
        return defer(() =>
          this.storage.ref('post-pictures/' + uid)
            .put(file, {
              customMetadata:{
                originalName: file.name
              }
            })
            .then()
        ).pipe(
          map(fileRef => {
            fileRef.id = uid;
            return fileRef;
          })
        );
  }

  getFileUrl(id: string): Observable<any> {
    return this.storage.ref('post-pictures/' + id).getDownloadURL();
  }

}
