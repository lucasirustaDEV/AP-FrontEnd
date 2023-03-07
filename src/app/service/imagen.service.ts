import { Injectable } from '@angular/core';
import { Storage, getStorage, uploadBytesResumable, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

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
        
        console.log(await getDownloadURL(item));
        this.url = await getDownloadURL(item);
      }
    })
    .catch(error => console.log(error))
  }


  subirArchivo($event: any, seccion: string) {
    this.url = "";
    const fechaHora = new Date();
    const archivoImg = fechaHora.getFullYear().toString() + fechaHora.getMonth().toString() + fechaHora.getDay().toString()
      + fechaHora.getHours().toString() + fechaHora.getMinutes().toString() + fechaHora.getSeconds().toString();
    const nombre = seccion + "_" + archivoImg;
    /*const storage = getStorage();*/

    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagenes/` + nombre);
    // Upload file and metadata to the object 'images/mountains.jpg'
    /*const storageRef = ref($event, 'imagenes/' + nombre);*/
    const uploadTask = uploadBytesResumable(imgRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.url = downloadURL;
        });
      }
    );
  }

}
