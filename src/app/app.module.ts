import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { FormItemComponent } from './form-item/form-item.component';
import { FormsModule } from '@angular/forms';
import { FormClienteComponent } from './form-cliente/form-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ClienteListComponent,
    FormItemComponent,
    FormClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
