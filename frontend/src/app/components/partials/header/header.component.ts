import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  user!:User;
  cartQuantity=0;
  constructor(private userService:UserService, cartService:CartService){
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })
  }

  logout(){
    this.userService.logout();
  }

}
