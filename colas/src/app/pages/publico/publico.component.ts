import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit {

  constructor(
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('container');
    this.escucharSockets();
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('container');
  }

  escucharSockets() {
  // Obtener los tickets atendidos
  this.wsService.listen('tickets-atendidos').subscribe(
    (tickets: any) => { 
      // tslint:disable-next-line: forin
      for (const i in tickets) {
        const pos = tickets.length - Number(i);
        $('#lblTicket' + pos).html(`Ticket ${tickets[i].numero}`);
        $('#lblEscritorio' + pos).html(`Escritorio ${tickets[i].escritorio.escritorio}`);
      }
    });
  }
}
