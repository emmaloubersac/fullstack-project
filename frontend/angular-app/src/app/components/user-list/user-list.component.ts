import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  userList: User[] = [];
  sortField: 'id' | 'firstName' | 'lastName' | 'email' | "userType" = 'id';
  ascending: boolean = true;

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);

  ngOnInit() {

    // Load users from the service
    const subscription = this.userService.getUsers().subscribe(users => {
      this.userList = users;
    }, error => {
      console.error("Error loading users:", error);
    });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })  
  }

  // Method to sort the user list by a specific field
  sortBy(field: keyof User) {
    this.sortField = field;
    this.ascending = !this.ascending;
    this.userList.sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';

      if (valA < valB) return this.ascending ? -1 : 1;
      if (valA > valB) return this.ascending ? 1 : -1;
      return 0;
    });
  }

  // Method to sort by user type
  sortByUserType(): void {
    this.sortField = "userType";
    this.ascending = !this.ascending;
    this.userList.sort((a, b) => {
      const typeA = a.userType?.type?.toLowerCase() || '';
      const typeB = b.userType?.type?.toLowerCase() || '';
      const result = typeA.localeCompare(typeB);
      return this.ascending? result : -result;
    });
  }

  // Method to navigate to the user form for updating a user
  goToForm(id: number) {
    this.router.navigate(['/users/edit/' + id]);
  }

  // Method to delete a user
  deleteUser(id: number) {
    const confirmed = window.confirm("Etes vous sûre de vouloir supprimer cet utilisateur?");
    if (confirmed) {
      this.userService.deleteUser(id).subscribe(res => {
        this.userList = this.userList.filter(user => user.id != id)
      });
      alert('✅ L\'utilisateur a été supprimé avec succès !');
    }
  }

  // Method to get the sort arrow
  getSortArrow(field: string): string {
    return this.sortField === field ? (this.ascending ? '▲' : '▼') : '';
  }

}
