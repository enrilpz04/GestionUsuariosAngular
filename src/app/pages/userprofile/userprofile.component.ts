import { Component, inject } from '@angular/core';
import { IStudent } from '../../interfaces/istudent.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  student : IStudent | null = null
  activatedRoute = inject(ActivatedRoute)
  studentsService = inject(StudentsService)

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id
      this.student = await this.studentsService.getById(id);
    })
  }

  
  deleteUser() {
    Swal.fire({
      title:
        '¿Estás seguro de eliminar al usuario ' + this.student?.first_name + '?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.delete(this.student?._id!).then((response) => {
          if(response._id){
            Swal.fire({
              title: 'Usuario eliminado con éxito',
              text: `El usuario ${this.student?.first_name} ${this.student?.last_name} ha sido eliminado.`,
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
