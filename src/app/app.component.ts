import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'divisor-de-conta';
  bloquearInterface = false;
  exibirFormProduto = false;
  exibirFormCliente = false;
  fNomeProduto = '';
  fPrecoProduto = 0.0;

  produtos: any[] = [];
  clientes: any[] = [];
  pedidos: any[] = [];
  pedido_cliente: any[] = [];
  total: any[] = [];

  formProduto(){
    this.bloquearInterface = true;
    this.exibirFormProduto = true;
  }
  formCliente(){
    this.bloquearInterface = true;
    this.exibirFormCliente = true;
  }
  cancelar(){
    this.bloquearInterface = false;
    this.exibirFormProduto = false;
    this.exibirFormCliente = false;
  }

  adicionarProduto(produto:any){
    produto.id = this.produtos.length+1;
    this.produtos.push(produto);
  }

  adicionarPedido(pedido:any){
    let cliente = {"nome":pedido.nome, "paga_taxa":pedido.paga_taxa, "total":0.0}
    this.clientes.push(cliente)

    let pedidosDoCliente = pedido.pedidos;

    pedidosDoCliente.forEach((pedidoCliente:any) => {
      let idProduto = this.pegarIdProduto(pedidoCliente.nome);
      let id = this.pedidos.length+1;

      if(pedidoCliente.compartilha){
        let idPedido = this.pedidos.find((p)=>p.fk_produto === Number(idProduto) && p.compartilhado);
        if(idPedido){
          id = idPedido.id;
        } else {
          this.pedidos.push({
            "id":id,
            "fk_produto":Number(idProduto),
            "compartilhado":pedidoCliente.compartilha,
            "quantidade":pedidoCliente.quantidade
          });
        }
      } else {
          this.pedidos.push({
            "id":id,
            "fk_produto":Number(idProduto),
            "compartilhado":pedidoCliente.compartilha,
            "quantidade":pedidoCliente.quantidade
          });
      }


      this.pedido_cliente.push({
        "cliente":cliente.nome,
        "fk_pedido":id
      })
    });
  }

  calcular(){
    this.clientes.forEach((cliente)=>{
      let nome = cliente.nome;
      let pedidosCliente = this.pedido_cliente.filter((item)=> item.cliente === nome);
      let total = 0.0;

      pedidosCliente.forEach((pedidoCliente)=>{
        let pedido = this.pedidos.find((p)=>p.id === pedidoCliente.fk_pedido);
        let produto = this.produtos.find((produto)=>produto.id === pedido?.fk_produto)
        let consumidores = this.pedido_cliente.filter((consumo)=>consumo.fk_pedido === pedido?.id).length;

        total += (produto!.preco * pedido!.quantidade) / consumidores;
      });

      if(cliente.paga_taxa)
        total+=total*0.1

      cliente.total = total;
      console.log(cliente);
    });
  }

  pedidosPorCliente(){
    let list: any = []
    this.clientes.forEach((cliente)=>{
      let meusProdutos: (string | undefined)[] = []
      let idPedidos = this.pedido_cliente.filter((p)=>p.cliente === cliente.nome);
      idPedidos.forEach((idPedido)=>{
        let pedido = this.pedidos.find((p)=> p.id === idPedido.fk_pedido)
        let nomeProduto = this.produtos.find((p)=>p.id === pedido!.fk_produto)
        meusProdutos.push(nomeProduto?.nome)
      });
      list.push({"nome":cliente.nome, "produtos": meusProdutos, "total":cliente.total, "paga_taxa":cliente.paga_taxa});
    });
    return list;
  }

  pegarIdProduto(nomeProduto:string){
    let produto = this.produtos.find((p)=>p.nome === nomeProduto)
    return produto?.id
  }

  pegarNomeProduto(id:number){
    let produto = this.produtos.find((p)=>p.id === id)
    return produto?.nome
  }
}
