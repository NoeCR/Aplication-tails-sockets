import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import * as $ from 'jquery';
import { ErrorManagerService } from '../../services/error-manager.service';

@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})
export class EscritorioComponent implements OnInit {

  public escritorio: number;
  public totalTickets: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsService: WebsocketService,
    private error: ErrorManagerService
  ) {
    this.escritorio = 0;
    this.totalTickets = 0;
  }

  ngOnInit() {
    this.setEscritorio();
    this.escucharSockets();
    this.getTotalTickets();
  }

//tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    this.wsService.emit('desactivar-escritorio', this.escritorio);
  }
  escucharSockets() {
    // Obtener siguiente ticket
    this.wsService.listen('siguiente-ticket').subscribe(
      (ticket: any) => {
        if (isNaN(Number(ticket.numero))) {
          $('small').html(`${ticket}`);
        } else {
          $('small').html(`${ticket.numero}`);
        }
      });
    // Obtener el total de tickets
    this.wsService.listen('numero-tickets').subscribe(
      (total: number) => {
        this.totalTickets = total;
      }
    );
    this.wsService.listen('escritorio-activado').subscribe(
      (desktop: any) => {
        console.log(desktop);
        if (isNaN(Number(desktop))) {
          this.error.setError(`Escritorio ${this.route.snapshot.params.id} no disponible`);
          this.router.navigate(['home']);
        } else {
          this.escritorio = desktop;
        }
      });
  }
  getNextTicket() {
    this.wsService.emit('atender-ticket', {escritorio: this.escritorio});
    this.totalTickets--;
  }
  getTotalTickets() {
    this.wsService.emit('tickets');
  }
  setEscritorio() {
    this.wsService.emit('activar-escritorio', this.route.snapshot.params.id);
  }
}
