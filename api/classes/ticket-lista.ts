import { Tiket } from './ticket';

export class TicketsLista {

    public tickets: Tiket[] = [];
    public ultimos4: Tiket[] = [];
    public escritorios: number[] = [];

    constructor(){ }

    // Añadir ticket
    añadirTicket(){
        var num = (this.tickets.length + 1) || 1; 
        var ticket = new Tiket(num);
        this.tickets.push(ticket);
        //console.log(this.tickets.length);
    }
    // Obtener todos los tickets
    getNumTickets(){
        return (this.tickets.length) || 0;
    }
    // Obtener el numero del ultimo ticket

    // Obtener el siguiente ticket
    getNextTicket(desktop: number) {
        var ticket = this.tickets.shift();
        if(ticket){
            ticket.setEscritorio(desktop);
            this.ultimos4.push(ticket); 
            return ticket;
        }else{
            return 'No hay más tickets';
        }
            
    }
    // Obtener los 4 tickets atendidos

    // Eliminar ticket

    // Obtener escritorio disponible
    getAvaibleDesktop(desktop: number) {
        console.log(this.escritorios.indexOf(desktop));
        if(this.escritorios.indexOf(desktop) < 0){
            this.escritorios.push(desktop);
            return desktop;
        }else{
            return 'Escritorio no disponible';
        }
    }
    setAvaibleDesktop(desktop: number) {
        if(this.escritorios.indexOf(desktop) >= 0){
            var desc = this.escritorios.splice(this.escritorios.indexOf(desktop), 1);
            return 'Escritorio  disponible';
        }
    }
}