import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IStudent } from '../interfaces/istudent.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseURL : string = "https://peticiones.online/api/users/"
  private http = inject(HttpClient)

  getAll(): Promise<IStudent[]> {
    return firstValueFrom(this.http.get<any>(this.baseURL)).then(response => {
      return response.results;
    });
  }

  getById(id: string): Promise<IStudent> {
    return firstValueFrom(this.http.get<IStudent>(`${this.baseURL}${id}`))
  }

  insert(body: IStudent): Promise<IStudent> {
    return firstValueFrom(this.http.post<IStudent>(this.baseURL, body))
  }

  update(body: IStudent): Promise<IStudent> {
    let id = body._id;
    delete body._id;
    return firstValueFrom(this.http.put<IStudent>(`${this.baseURL}${id}`, body))
  }

  delete(id: string): Promise<IStudent> {
    return firstValueFrom(this.http.delete<IStudent>(`${this.baseURL}${id}`))
  }
}
