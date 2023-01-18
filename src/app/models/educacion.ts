export class Educacion {
    id: number;
    nombreE: string;
    descripcionE: string;
    desde: number;
    hasta: number;
    imglogo: string;

    constructor(nombreE: string, descripcionE: string, desde: number, hasta: number, imglogo: string) {
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
        this.desde = desde;
        this.hasta = hasta;
        this.imglogo = imglogo;
    }
}
