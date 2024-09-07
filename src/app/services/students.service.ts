import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IStudent } from '../interfaces/istudent.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  // Base URL for the API and HttpClient dependency injection
  private baseURL : string = "https://peticiones.online/api/users/"
  private http = inject(HttpClient)

  /**
   * Method to get all students
   * @returns students list
   */
  getAll(): Promise<IStudent[]> {
    return firstValueFrom(this.http.get<any>(this.baseURL)).then(response => {
      return response.results;
    });
  }

  /**
   * Method to get a student by ID
   * @param id student ID
   * @returns student object
   */
  getById(id: string): Promise<IStudent> {
    return firstValueFrom(this.http.get<IStudent>(`${this.baseURL}${id}`))
  }

  /**
   * Method to insert a new student
   * @param body student object
   * @returns student object
   */
  insert(body: IStudent): Promise<IStudent> {
    return firstValueFrom(this.http.post<IStudent>(this.baseURL, body))
  }

  /**
   * Method to update a student
   * @param body student object
   * @returns student object
   */
  update(body: IStudent): Promise<IStudent> {
    let id = body._id;
    delete body._id;
    return firstValueFrom(this.http.put<IStudent>(`${this.baseURL}${id}`, body))
  }

  /**
   * Method to delete a student
   * @param id student ID
   * @returns student object
   */
  delete(id: string): Promise<IStudent> {
    return firstValueFrom(this.http.delete<IStudent>(`${this.baseURL}${id}`))
  }
}
