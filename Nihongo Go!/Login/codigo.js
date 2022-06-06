import { Jugador } from "../jugador.js";

const form = document.querySelector("form");
const btnUsuarios = document.querySelector("#mostrar");
const inicio = document.querySelector("#play");//boton
const btnBorrar = document.querySelector("#borrar")

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    //recibimos los datos para guardar
    const nombre = e.target[0].value;
    let puntos = 0;
    nombre == "" ? Swal.fire({title:"Datos no validos",icon:"warning"}):guardarUsuario(nombre,puntos);
    form.reset()
})
//guardamos el usuario en el localStorage
function guardarUsuario(a,b){
    //quitamos el bloqueo al enlace para el juego
    inicio.classList.remove("nule");
    let newJugador = new Jugador(a,b);
    newJugador.guardarJugador(a,b)
    
}
//mostramos la lista de usuarios
function mostrarUsuarios(){
    const container = document.querySelector("#container");
    container.classList.add("rankin_container");
    container.innerHTML=`<h2 class="h2_score">Score</h2>`
    //este H2 lo creamos en javaScript para que no rompa el css
    let ul = document.createElement("UL");
    const arrayJugadores = [];
    for(let i = 0; i<localStorage.length; i++){
        //recorremos el localStorage buscando las key con sus respectivos values
        let nombreUsuario = localStorage.key(i);//key
        let puntosUsuarios = localStorage.getItem(localStorage.key(i));//values
        arrayJugadores.push({nombreUsuario,puntosUsuarios})
    }
    function SortArray(x, y){
        let valorX = Number(x.puntosUsuarios);
        let valorY = Number(y.puntosUsuarios)
        if (valorX > valorY) {return -1;}
        if (valorX < valorY) {return 1;}
        return 0;
    }
    let arrayOrdenado = arrayJugadores.sort(SortArray)
    for(let j= 0;j<arrayOrdenado.length;j++){
        let span = document.createElement("span");
        let spanScore = document.createElement("span");
        spanScore.classList.add("span_score")
        let li = document.createElement("li");
        let position = j+1;
        span.innerText = `${position}`
        spanScore.innerText = ` ${arrayOrdenado[j].puntosUsuarios}`
        li.innerText = `${position}. ${arrayOrdenado[j].nombreUsuario} `;
        li.appendChild(spanScore)
        ul.appendChild(li);
        container.appendChild(ul);
    }
    console.log(arrayOrdenado)
    
}
btnUsuarios.addEventListener("click",(e)=>{
    e.preventDefault();
    mostrarUsuarios();
})
btnBorrar.addEventListener("click",(e)=>{
    e.preventDefault();
    borrarJugadores()})
//funcion para borrar usuarios
function borrarJugadores(){
    localStorage.clear()
    
    }


