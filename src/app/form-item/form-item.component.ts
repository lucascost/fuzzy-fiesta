import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.sass']
})
export class FormItemComponent {
  inputNomeProduto: string = '';
  inputPrecoProduto: Number = 0.0;
  @Output() dadosProduto = new EventEmitter<any>();
  @Output() btnCancelar = new EventEmitter<void>();

  adicionarProduto(){
    if(this.inputNomeProduto !== '' && this.inputPrecoProduto !== 0){
      const produto = {"id":15, "nome":this.inputNomeProduto, "preco":Number(this.inputPrecoProduto)}
      this.dadosProduto.emit(produto);
      this.inputNomeProduto='';
      this.inputPrecoProduto=0.0;
    }
  }

  cancelar(){
    this.btnCancelar.emit()
  }
}
