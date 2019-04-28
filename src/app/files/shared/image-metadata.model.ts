import {FileMetadata} from './file.model';

export interface ImageMetaData {
  base64Image?: string;
  imageBlob?: Blob;
  fileMeta: FileMetadata;

}
