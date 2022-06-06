//import { Quiz } from "./Quiz.js";


let variableSesion = sessionStorage.getItem("testCache");
if(variableSesion === null){
    window.location.href = "http://127.0.0.1:5500/Login/index.html"
}
let {nombre, puntos} = JSON.parse(sessionStorage.getItem('testCache'));
let puntajeTotal;
const btnPlayAudio = document.querySelector("#btnPlayAudio");
const btnStop = document.querySelector("#btnStop")
let volumen = document.querySelector("#volumen")


const scoreImg = async () => { 
    let peticion = await fetch('../data/memes.json');
    let resultado = await peticion.json();
    return resultado
}
const {puntajeExcelente, puntajeAprobado, puntajeDecente, puntajeMalo, puntajeMuyMalo, puntajeMediocre} = await scoreImg();

function insertImage(points) {
    if (points === 10) return puntajeExcelente
    if (points === 9 || points === 8) return puntajeAprobado
    if (points === 7 || points === 6) return puntajeDecente
    if (points === 5 || points === 4) return puntajeMalo
    if (points === 3 || points === 2) return puntajeMuyMalo
    if (points === 1 || points === 0) return puntajeMediocre
}

export class UI{
    constructor(){}
    /**
     * @param {string} //pregunta a renderizar
     */
    showQuestion(text){
        //seleccionamos el contenedor HTML que tiene las preguntas y colocamos el titulo(la pregunta en question)
        const questionTitle = document.getElementById("question")
        questionTitle.innerHTML = text;//y le agregamos a ese elemento el text(pregunta)
    }
    showImg(img){
        const imgContainer = document.getElementById("imagen");
        imgContainer.src = img;
    }
    /**
     * 
     * @param {string[]} choices
     */
    //Muestra la pregunta 
    showChoices(choices,callback){
        //seleccionamos el contenedor html que tiene las opciones
        const choiceContainer = document.getElementById("choices");
        choiceContainer.innerHTML ="";//para que limpie y no se sumen a las preguntas siguientes
        //luego creo una constante opciones(opciones de cada pregunta)
        const opciones = choices;
        //y le asingo sort para que su aparicion sea aleatoria
        opciones.sort((a,b)=>Math.random() -0.5)
    //en base a las opciones realiza un for para crear cada boton con datos.
        for(let i =0; i < opciones.length; i++){
            //los botones que creamos sera en base a la longitud de las opciones
            const button = document.createElement("BUTTON");//creamos el contenedor de botonos
            button.innerText= choices[i];//le añade al boton el texto del array que esta recorriendo por cada iteracion
            button.className = "btn-opciones";
            button.addEventListener("click",()=>callback(choices[i]));
            //cuando el usuario clickea cada boton se ejecutara un envento , llamando a la funcion callback, que tiene como parametro el texto del boton
            choiceContainer.appendChild(button);//le agregamos los botones al contedor de botonos
        }
    }
    /**
     * @param {number} //score
     */
    //crea una especie de modal en donde se muestra el resultado del usuario
    showScore(score){
        //Alert que mostrar los puntos y guiara al usuario como debe seguir
        Swal.fire({
            title: `Tu puntaje es de ${score}`,
            imageUrl:insertImage(score),
            backdrop: "rgba(8, 38, 47, 0.4)",
            imageWidth: "350px",
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText:`Jugar de nuevo`,
            cancelButtonText:`Volver al inicio`
        }).then((result)=>{
            //opcion que permite volver a jugar
            if(result.isConfirmed){
                calcularPuntaje(score)
                location.reload()
            }else{
                //Aqui le damos la opcion de volver al inicio
                Swal.fire({
                    title: `¿Seguro desea volver al inicio?`,
                    backdrop: "rgba(8, 38, 47, 0.4)",
                    showConfirmButton: true,
                    showCancelButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText:`Probar de nuevo`,
                    cancelButtonText:`Volver al inicio`
                }).then((result)=>{
                    //volvemos a confirmar su desicion de volver al inicio
                    if(result.isConfirmed){
                        //en caso de que se arrepintio vuelve a jugar
                        location.reload()
                    }else{
                        calcularPuntaje(score)
                        sessionStorage.removeItem('testCache')
                        //si no vuelve al inicio
                        window.location.href = `http://127.0.0.1:5500/Login/index.html`
                    }
                })
            }
        })
    }
    guardarPuntos(score){
        newJugador.guardarPuntos(score)
    }

    /**
     * @param {number} //indece de la pregunta actual 
     * @param {number} //total de preguntas
     */
    //Muestra la pregunta actual y la cantidad de preguntas total
    showProgress(currentIndex ,total){
        let progreso = document.getElementById("progreso");
        progreso.innerHTML = `Pregunta ${currentIndex} de ${total}`
    }
}

function calcularPuntaje(score) {
    if (localStorage.key(nombre) === undefined) {
        localStorage.setItem(
            nombre,
            parseInt(puntos) + score
        )
    }
    else {
        puntajeTotal = JSON.parse(localStorage.getItem(nombre))
        localStorage.setItem(
            nombre,
            puntajeTotal + score
        )
    }
}
const audio = document.getElementById('my-audio');

function ponerMusica(){    
    audio.play()
    audio.loop = true;
}
export function detenerMusica(){
    audio.pause()
}

 btnPlayAudio.addEventListener("click",ponerMusica)
 btnStop.addEventListener("click",detenerMusica)
 volumen.addEventListener("change",(ev)=>{
    audio.volume = ev.currentTarget.value;
 },true)


