import { Component } from '@angular/core';
import { IStudent } from '../../interfaces/istudent.interface';
import { UsercardComponent } from '../../components/usercard/usercard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsercardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  arrStudents: IStudent[] = []

  ngOnInit() {
    this.arrStudents = [
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      },
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      },
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      },
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      },
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      },
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      },
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      },
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: '',
        image: 'https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online',
        password: '',
      }
  ]}
}
