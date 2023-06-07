import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.sass']
})
export class CalculadoraComponent {
  constructor(){
    this.calcular()
  }

  produtos = [
    {
      "id":1,
      "nome":"Rodízio Simples",
      "preco":70.0
    },
    {
      "id":2,
      "nome":"Rodízio Executivo",
      "preco":85.0
    },
    {
      "id":3,
      "nome":"Temaki",
      "preco":20.0
    },
    {
      "id":4,
      "nome":"Refrigerante",
      "preco":6.0
    },
    {
      "id":5,
      "nome":"Porção de Peixe",
      "preco":50.0
    }
  ]

  clientes = [
  {
  "nome": "Marcos",
  "paga_taxa": true
  },
  {
  "nome": "Júlia",
  "paga_taxa": true
  },
  {
  "nome": "Fernando",
  "paga_taxa": true
  },
  {
  "nome": "Caio",
  "paga_taxa": true
  },
  {
  "nome": "Patricia",
  "paga_taxa": true
  },
  {
  "nome": "Bianca",
  "paga_taxa": true
  }
  ]

  pedidos = [
    {
      "id":1,
      "fk_produto":1,
      "quantidade":1,
    },
    {
      "id":2,
      "fk_produto":4,
      "quantidade":1,
    },
    {
      "id":3,
      "fk_produto":1,
      "quantidade":1,
    },
    {
      "id":4,
      "fk_produto":4,
      "quantidade":1,
    },
    {
      "id":5,
      "fk_produto":1,
      "quantidade":1,
    },
    {
      "id":6,
      "fk_produto":4,
      "quantidade":1,
    },
    {
      "id":7,
      "fk_produto":2,
      "quantidade":1,
    },
    {
      "id":8,
      "fk_produto":4,
      "quantidade":1,
    },
    {
      "id":9,
      "fk_produto":3,
      "quantidade":2,
    },
    {
      "id":10,
      "fk_produto":4,
      "quantidade":1,
    },
    {
      "id":11,
      "fk_produto":5,
      "quantidade":1,
    },
    {
      "id":12,
      "fk_produto":4,
      "quantidade":1,
    }
  ]

  pedido_cliente = [
    {
      "fk_pedido":1,
      "cliente":"Marcos"
    },
    {
      "fk_pedido":2,
      "cliente":"Marcos"
    },
    {
      "fk_pedido":3,
      "cliente":"Fernando"
    },
    {
      "fk_pedido":4,
      "cliente":"Fernando"
    },
    {
      "fk_pedido":5,
      "cliente":"Júlia"
    },
    {
      "fk_pedido":6,
      "cliente":"Júlia"
    },
    {
      "fk_pedido":7,
      "cliente":"Caio"
    },
    {
      "fk_pedido":8,
      "cliente":"Caio"
    },
    {
      "fk_pedido":9,
      "cliente":"Patricia"
    },
    {
      "fk_pedido":10,
      "cliente":"Patricia"
    },

    {
      "fk_pedido":11,
      "cliente":"Patricia"
    },
    {
      "fk_pedido":11,
      "cliente":"Bianca"
    },
    {
      "fk_pedido":12,
      "cliente":"Bianca"
    },
  ]

  calcular(){
    this.clientes.forEach((cliente)=>{
      let nome = cliente.nome;
      let pedidosCliente = this.pedido_cliente.filter((item)=> item.cliente === nome);

      let total = 0.0;

      pedidosCliente.forEach((pedidoCliente)=>{
        let pedido = this.pedidos.find((pedido)=>pedido.id === pedidoCliente.fk_pedido);
        let produto = this.produtos.find((produto)=>produto.id === pedido?.fk_produto)
        let consumidores = this.pedido_cliente.filter((consumo)=>consumo.fk_pedido === pedido?.id).length;

        total += (produto!.preco * pedido!.quantidade) / consumidores;
      });

      if(cliente.paga_taxa)
        total+=total*0.1
    });
  }
}
