export class persona {
    id?: number;
    nombre: string;
    apellido: string;
    edad: number;
    acerca: string;
    imgperfil: string;
    fechaNac: Date;
    mail: string;
    ocupacion: string;
    imgBanner: string;
    idDomicilio: number;

    constructor (nombre: string, apellido: string, edad: number, acerca: string, imgperfil: string, fechaNac: Date, mail: string, ocupacion: string, imgBanner: string, idDomicilio: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.acerca = acerca;
        this.imgperfil = imgperfil;
        this.fechaNac = fechaNac;
        this.mail = mail;
        this.ocupacion = ocupacion;
        this.imgBanner = imgBanner;
        this.idDomicilio = idDomicilio;
    }
}