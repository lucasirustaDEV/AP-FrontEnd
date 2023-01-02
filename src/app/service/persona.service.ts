import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { persona } from '../models/persona.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL = environment.URL + 'personas/';

  constructor(private httpClient: HttpClient) { }

  /*public getPersona(): Observable<persona>{
    return this.http.get<persona>(this.URL + 'traer/perfil')
  }*/

  public lista(): Observable<persona[]>{
    return this.httpClient.get<persona[]>(this.URL + 'lista');
  }

  public detail(id:number): Observable<persona> {
    return this.httpClient.get<persona>(this.URL + `detail/${id}`);
  }

  /*public save(educacion: Educacion): Observable<any> {
    return this.HttpClient.post<any>(this.URL + 'create', educacion);
  }*/

  public update(id: number, perso: persona): Observable<any> {
    return this.httpClient.put<any>(this.URL + `update/${id}`, perso);
  }

  /*public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.URL + `delete/${id}`);
  }*/
}
