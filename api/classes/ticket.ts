export class Tiket {
    
    public numero: number;
    public escritorio: number;
    constructor(numero: number){
        this.numero = numero;
        this.escritorio = 0;
    }
    setEscritorio(desktop: number){
        this.escritorio = desktop;
    }
}