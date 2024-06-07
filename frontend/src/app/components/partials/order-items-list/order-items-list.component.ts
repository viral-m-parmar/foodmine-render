import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css'
})
export class OrderItemsListComponent {

  @Input()
  order!:Order;
}
