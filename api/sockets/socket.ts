import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { TicketsLista } from '../classes/ticket-lista';


export const usuariosConectados = new UsuariosLista();
export const ticketsLista = new TicketsLista();

export const mostrarTickets = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('tickets', () => {
        console.log('dame tickets');
        io.emit('numero-tickets', ticketsLista.getNumTickets());
    });
}
export const nuevoTicket = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('nuevo-ticket', () => {
        ticketsLista.añadirTicket();
        io.emit('numero-tickets', ticketsLista.getNumTickets());
    });
}
export const atenderTicket = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('atender-ticket', (desktop) => {        
        io.emit('siguiente-ticket', ticketsLista.getNextTicket(desktop));
        io.emit('tickets-atendidos', ticketsLista.getLastFour());
        
    });
}
export const activarEscritorio = (cliente: Socket) => {
    cliente.on('activar-escritorio', (desktop) => {
        cliente.emit('escritorio-activado', ticketsLista.getAvaibleDesktop(desktop));
    });
}
export const desactivarEscritorio = (cliente: Socket) => {
    cliente.on('desactivar-escritorio', (desktop) => {
        console.log(desktop);
        cliente.emit('escritorio-desactivado', ticketsLista.setAvaibleDesktop(desktop));
    });
}
export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('disconnect', (args) => {
        console.log('Escritorio desconectado');
        cliente.emit('escritorio-desactivado', ticketsLista.setAvaibleDesktop(args));
    });
}
// export const ticketsAtendidos = (cliente: Socket, io: socketIO.Server ) => {
//     cliente.on('tickets-atendidos', () => {
//         cliente.emit('tickets-atendidos', ticketsLista.getLastFour());
//     });
// }











export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}



// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', (  payload: { de: string, cuerpo: string }  ) => {

        console.log('Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload );

    });

}

// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', (  payload: { nombre: string }, callback: Function  ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        io.emit('usuarios-activos', usuariosConectados.getLista()  );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });

}


// Obtener Usuarios
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('obtener-usuarios', () => {

        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista()  );
        
    });

}
