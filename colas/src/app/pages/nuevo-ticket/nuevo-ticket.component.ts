import { Component, OnInit, DoCheck } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  styleUrls: ['./nuevo-ticket.component.css']
})
export class NuevoTicketComponent implements OnInit {

  public numTickets: number;
  constructor(
    private wsService: WebsocketService
  ) {
    this.numTickets = 0;
  }

  ngOnInit() {
    this.gettickets();
    this.getNumeroTickets();
  }

  ngDoCheck() {
    this.getNumeroTickets();
  }
  gettickets() {
    this.wsService.emit('tickets');
  }
  addTicket() {
    this.wsService.emit('nuevo-ticket');
  }
  getNumeroTickets() {
    this.wsService.listen('numero-tickets').subscribe(
      (totalTickets: any) => {
        if (Number(totalTickets) > 0) {
          this.numTickets = Number(totalTickets);
        } else {
          console.log('Error en el recibo de datos "numero de tickets"');
        }
        this.showNumberTickets();
      }
    );
  }
  showNumberTickets() {
    $('#lblNuevoTicket').html(`Ticket Nº: ${this.numTickets}`);
  }
}
