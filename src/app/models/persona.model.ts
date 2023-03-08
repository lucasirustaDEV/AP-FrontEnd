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
    domicilio: string;

    constructor (nombre: string, apellido: string, edad: number, acerca: string, imgperfil: string, fechaNac: Date, mail: string, ocupacion: string, imgBanner: string, domicilio: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.acerca = acerca;
        this.imgperfil = imgperfil;
        this.fechaNac = fechaNac;
        this.mail = mail;
        this.ocupacion = ocupacion;
        this.imgBanner = imgBanner;
        this.domicilio = domicilio;
    }
}