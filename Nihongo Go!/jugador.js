export class Jugador{
    constructor(nombre,puntos){
        this.nombre = nombre;
        this.puntos = puntos;
    }
    guardarJugador(nombre,puntos){
            //Creamos un "cache" del nuevo jugador que juega por primera vez
            sessionStorage.setItem( 'testCache' ,JSON.stringify({nombre,puntos}))
    }
}
// de esta forma el objeto jugador es el que guarda en el localstorage y asi poder ir modifando de una forma mas dinamica