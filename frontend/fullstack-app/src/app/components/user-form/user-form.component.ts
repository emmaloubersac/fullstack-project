import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserType } from '../../models/user-type.model';
import { UserTypeService } from '../../services/user-type.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule,
    FormsModule,CommonModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  userTypesList: UserType[] = [];
  userId: String | null = null;

  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private userTypesService = inject(UserTypeService);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    // to load user types
    const subscription = this.userTypesService.getUserTypes().subscribe(userTypes => {
      this.userTypesList = userTypes;
    }, error => {
      console.error("Error loading userType:", error);
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    }) 

    // Initialize the form
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
    });


    // Get the user ID from the route parameters if available
    // This is used to determine if we are editing an existing user or creating a new one
    this.userId = this.route.snapshot.paramMap.get('id');

    // If we have an ID, we are editing an existing user
    if (this.userId) {
      this.userService.getUserById(Number(this.userId)).subscribe(user => {
        // Populate the form with the user data
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType?.type || ""
        });
      })
    }
  }

  onSubmit(): void {

    // If we have an ID, we are updating an existing user
    if (this.userId) {
      const user: User = this.userForm.value;
      const userType: UserType = this.userTypesList.find(type => type.type === this.userForm.value.userType) || this.userTypesList[0]; 
      user.userType = userType; 
      user.id = Number(this.userId); // Ensure ID is a number
      
      const subscription = this.userService.updateUser(user).subscribe({
        next: response => {
          alert('✅ L\'utilisateur a été mis à jour avec succès !');
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

    // otherwise, we are creating a new user
    if (this.userForm.valid) {
      const userType: UserType = this.userTypesList.find(type => type.type === this.userForm.value.userType) || this.userTypesList[0]; // Default to first type if not found
      const user: User = this.userForm.value;
      user.userType = userType; 
      const subscription = this.userService.createUser(user).subscribe({
        next: response => {
          alert('✅ L\'utilisateur a été créé avec succès !');
          this.userForm.reset(); // reset form after success
        },
        error: err => {
          console.error('Failed to create user', err);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      }) 
    
    }
  }
}
