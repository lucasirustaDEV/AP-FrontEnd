export class Proyecto {
    id: number;
    nombre: string;
    descripcion: string;
    imgproyecto: string;
    linkproyecto: string;

    constructor(nombre: string, descripcion: string, imgproyecto: string, linkproyecto: string) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imgproyecto = imgproyecto; 
        this.linkproyecto = linkproyecto;
    } 
}
