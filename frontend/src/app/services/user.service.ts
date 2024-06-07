import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_SIGNUP_URL } from '../shared/constant/urls';
import { ToastrService } from 'ngx-toastr';
import { ISignupUser } from '../shared/interfaces/ISignupUser';
import { error } from 'console';

const USER_KEY = "User ";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to Foodmine ${user.name} !`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed')
        }
      })
    );
  }

  signup(signupUser:ISignupUser): Observable<User>{
    return this.http.post<User>(USER_SIGNUP_URL,signupUser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`
          )
        },
        error: (err) => {
          this.toastrService.error(err.error,'Register Failed');
        }
      })
    );
  }

  logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User(); 
  }

  public get currentUser():User{
    return this.userSubject.value;
  }
}
