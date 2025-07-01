import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserType } from '../../models/user-type.model';
import { UserTypeService } from '../../services/user-type.service';

@Component({
  selector: 'app-user-type-list',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './user-type-list.component.html',
  styleUrl: './user-type-list.component.css'
})
export class UserTypeListComponent {
  userTypeList: UserType[] = [];
  sortField: 'id' |  "type" = 'id';
  ascending: boolean = true;

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private userTypeService = inject(UserTypeService);

  ngOnInit() {
    // Load user types from the service
    const subscription = this.userTypeService.getUserTypes().subscribe(userTypes => {
      this.userTypeList = userTypes;
    }, error => {
      console.error("Error loading userType:", error);
    });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })  
  }

  // Sort the user types
  sortBy(field: keyof UserType) {
    this.sortField = field;
    this.ascending = !this.ascending;
    this.userTypeList.sort((a, b) => {
      if (a[field] < b[field]) return this.ascending ? -1 : 1;
      if (a[field] > b[field]) return this.ascending ? 1 : -1;
      return 0;
    });
  }

  // Navigate to the form for updating a user type
  goToForm(id: number) {
    this.router.navigate(['/userTypes/edit/' + id]);
  }

  // Method to delete a user type
  deleteUserType(id: number) {
    const confirmed = window.confirm("Etes vous sûre de vouloir supprimer ce type d'utilisateur?");
    if (confirmed) {
      this.userTypeService.deleteUserType(id).subscribe(res => {
        this.userTypeList = this.userTypeList.filter(userType => userType.id != id)
      });
      alert('✅ Le type d\'utilisateur a été supprimé avec succès !');
    }
  }

  // Get the sort arrow 
  getSortArrow(field: string): string {
    return this.sortField === field ? (this.ascending ? '▲' : '▼') : '';
  }
}
