import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.sass']
})
export class ClienteListComponent {
  @Input() pedidos: any[] = []
}
