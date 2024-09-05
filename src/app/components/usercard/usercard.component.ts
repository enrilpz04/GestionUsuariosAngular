import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent {
  @Input() student: any;

  deleteUser() {
    Swal.fire({
      title:
        '¿Estás seguro de eliminar al usuario ' + this.student.first_name + '?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //TODO: Delete user API

        Swal.fire({
          title: 'Usuario eliminado con éxito',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver',
        });
      }
    });
  }
}
