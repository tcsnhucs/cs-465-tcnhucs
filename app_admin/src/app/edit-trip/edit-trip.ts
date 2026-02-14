import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-edit',
  standalone: true, // 1. Must be standalone
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './edit-trip.html', 
  styleUrl: './edit-trip.css'
})
export class TripEditComponent implements OnInit {
  editTripFormGroup!: FormGroup;
  submitted = false;
  private tripCode: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripData
  ) {}

  ngOnInit() {
    // Retrieve stashed tripCode
    this.tripCode = localStorage.getItem('tripCode');
    if (!this.tripCode) {
      console.error("Couldn't find stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    // Initialize form
    this.editTripFormGroup = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Use .subscribe() instead of .then() to match your Observable service
    this.tripService.getTrip(this.tripCode).subscribe({
      next: (data: any) => {
        console.log('Trip loaded:', data);
        // data[0] because your controller find() returns an array
        this.editTripFormGroup.patchValue(data[0]); 
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editTripFormGroup.valid) {
      // Use .subscribe() to match your service
      this.tripService.updateTrip(this.editTripFormGroup.value).subscribe({
        next: (data) => {
          console.log('Trip updated:', data);
          this.router.navigate(['']);
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Helper for template validation
  get f() { return this.editTripFormGroup.controls; }
}