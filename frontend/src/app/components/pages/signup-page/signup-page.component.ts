import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaaswordMatchValidator } from '../../../shared/validators/password_match_validator';
import { ISignupUser } from '../../../shared/interfaces/ISignupUser';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent  implements OnInit{

  registerForm!:FormGroup;
  isSubmitted =  false;
  returnUrl = '';

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['',[Validators.required, Validators.minLength(10)]]
    },{
      validators: PaaswordMatchValidator('password','confirmPassword')
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const formValue = this.registerForm.value;
    const user:ISignupUser = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      address: formValue.address
    };

    this.userService.signup(user).subscribe( () => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
