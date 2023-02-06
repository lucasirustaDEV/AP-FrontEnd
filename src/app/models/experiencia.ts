export class Experiencia {
    id? : number;
    nombreE : string;
    descripcionE : string;
    tareas : string;
    desde : string;
    hasta : string;
    imglogo : string;


    constructor(nombreE: string, descripcionE: string, tareas: string, desde: string, hasta: string, imglogo: string) {
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
        this.tareas = tareas;
        this.desde = desde;
        this.hasta = hasta;
        this.imglogo = imglogo;
    }
}
