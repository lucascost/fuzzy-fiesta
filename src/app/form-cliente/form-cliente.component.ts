import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.sass']
})
export class FormClienteComponent {
  @Input() produtos : any[] = []
  nomeCliente = ""
  produto = ""
  quantidade = 1
  compartilha = false
  bloquearNome = false
  pagaTaxa = false
  @Output() dadosPedido = new EventEmitter<any>();
  @Output() btnCancelar = new EventEmitter<void>();

  produtosSelecionados:any[] = []

  adicionarSelecionado(){
    if(this.nomeCliente !== "" && this.produto !== ""){
      let novoPedido = {
        "nome": this.produto,
        "quantidade": this.quantidade,
        "compartilha": this.compartilha
      }
      this.produtosSelecionados.push(novoPedido)
      this.produto = ""
      this.compartilha = false
      this.bloquearNome = true
    }
  }

  enviarPedido(){
    if(this.nomeCliente !== ''){
      const cliente = {"nome":this.nomeCliente, "paga_taxa":this.pagaTaxa, "pedidos":this.produtosSelecionados}
      this.dadosPedido.emit(cliente)
      this.produtosSelecionados=[]
      this.bloquearNome=false
      this.nomeCliente = ""
    }
  }

  cancelar(){
    this.btnCancelar.emit()
  }
}
