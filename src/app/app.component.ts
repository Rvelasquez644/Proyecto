import {Component, OnInit} from '@angular/core';

// @ts-ignore
import * as io from 'socket.io-client';

const socket = "localhost:3000";

@Component({
  selector: 'umg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyecto';

  // @ts-ignore
  sockets;
  // @ts-ignore
  mensage: string;

  constructor() {
  }

  ngOnInit(): void {
        this.Mensajes();
    }

  Mensajes(): void {

    this.sockets = io(socket);
    this.sockets.on('mensajes', (data: string) => {
      console.log(data);
      if (data) {
        const elementos = document.createElement('li');
        elementos.innerText = data;
        elementos.style.background = 'white';
        elementos.style.padding = '15px 30px';
        elementos.style.margin = '10px';
        // @ts-ignore
        document.getElementById('mensaje-list').appendChild(elementos);
      }
    });
  }


  MandarMesaje(): void {
    this.sockets.emit('mensaje', this.mensage);
    const elemento = document.createElement('li');
    elemento.innerHTML = this.mensage;
    elemento.style.background = 'gray';
    elemento.style.padding = '15px 30px';
    elemento.style.margin = '10px';
    elemento.style.textAlign = 'right';
    // @ts-ignore
    document.getElementById('mensaje-list').appendChild(elemento);
  }

}
