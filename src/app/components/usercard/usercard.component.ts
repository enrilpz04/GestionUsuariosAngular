import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent {
  @Input() student: any;

  studentsService = inject(StudentsService)

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
       
        this.studentsService.delete(this.student._id).then((response) => {
          if(response._id){
            Swal.fire({
              title: 'Usuario eliminado con éxito',
              text: `El usuario ${this.student.first_name} ${this.student.last_name} ha sido eliminado.`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Volver',
            });
          } else {
            throw new Error('Error al eliminar el usuario');
          }
        }).catch((error) => {
          
          Swal.fire({
            title: 'Error al eliminar el usuario',
            text: 'No se pudo eliminar el usuario. Por favor, intenta nuevamente.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver',
          });
        });
      }
    });
  }
}
