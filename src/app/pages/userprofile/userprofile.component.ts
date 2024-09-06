import { Component, inject } from '@angular/core';
import { IStudent } from '../../interfaces/istudent.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  student! : IStudent
  activatedRoute = inject(ActivatedRoute)
  studentsService = inject(StudentsService)

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id
      this.student = await this.studentsService.getById(id);
    })
    
  }

}
