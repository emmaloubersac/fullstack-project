import { Component, DestroyRef, inject } from '@angular/core';
import { UserType } from '../../models/user-type.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserTypeService } from '../../services/user-type.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-type-form',
  imports: [ReactiveFormsModule,
    FormsModule,CommonModule, RouterModule],
  templateUrl: './user-type-form.component.html',
  styleUrl: './user-type-form.component.css'
})
export class UserTypeFormComponent {
  
  userForm!: FormGroup;
  userTypesList: UserType[] = []; // You can load this from backend too
  userTypeId: String | null = null;
  
  private destroyRef = inject(DestroyRef);
  private userTypeService = inject(UserTypeService);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Load user types from the service
    const subscription = this.userTypeService.getUserTypes().subscribe(userTypes => {
      this.userTypesList = userTypes;
    }, error => {
      console.error("Error loading userType:", error);
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    }) 

    // Initialize the form
    this.userForm = this.fb.group({
      type: ['', Validators.required],
    });

    // Check if we are editing an existing userType, if so, load the userType ID
    this.userTypeId = this.route.snapshot.paramMap.get('id');

    // If we have an ID, we are editing an existing userType
    if (this.userTypeId) {
      this.userTypeService.getUserTypeById(Number(this.userTypeId)).subscribe(userType => {
        // Populate the form with the userType data
        this.userForm.patchValue({
          type: userType.type,
        });
      })
    }

  }

  onSubmit(): void {

    // If we have an ID, we are updating an existing userType
    if (this.userTypeId) {
          const userType: UserType = this.userForm.value;
          userType.type = userType.type.toUpperCase();
          userType.id = Number(this.userTypeId); // Ensure we set the ID for update
          
          const subscription = this.userTypeService.updateUserType(userType).subscribe({
            next: response => {
              alert('✅ Le type d\'utilisateur a été mis à jour avec succès !');
              this.userForm.reset(); // reset form after success
            },
            error: err => {
              console.error('Failed to update user', err);
            }
          });
    
          this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
          }) 
          return;
        }
    
    // If we don't have an ID, we are creating a new userType
    if (this.userForm.valid) {

      const userType: UserType = this.userForm.value;
      userType.type = userType.type.toUpperCase();

      // check if the userType already exists
      if (this.userTypesList.some(type => type.type === userType.type)) {
        alert('⚠️ Ce type d\'utilisateur existe déjà !');
        return;
      }

      // Create the userType
      const subscription = this.userTypeService.createUserType(userType).subscribe({
        next: response => {
          alert('✅ Le type d\'utilisateur a été créé avec succès !');
          this.userForm.reset(); // reset form after success
        },
        error: err => {
          console.error('Failed to create userType', err);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      }) 
    
    }
  }

}
