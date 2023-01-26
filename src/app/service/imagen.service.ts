import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  url: string = "";

  constructor(
    private storage: Storage
  ) { }

  public uploadImage($event: any, nombre: string){
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagenes/` + nombre)

    uploadBytes(imgRef, file)
    .then(response => {this.getImages()})
    .catch(error => console.log(error))

  }

  getImages(){
    const imagesRef = ref(this.storage, 'imagenes');
    list(imagesRef)
    .then(async response => {
      for (let item of response.items){
        this.url = await getDownloadURL(item);
      }
    })
    .catch(error => console.log(error))
  }
}
