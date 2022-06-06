import { Question } from "./Question.js";
import { UI } from "./UI.js";
import { detenerMusica } from "./UI.js";

let audioCorrecto = document.getElementById("audioCorrecto")
let audioError = document.getElementById("audioError")
export class Quiz {
    score= 0;
    questionIndex = 0;
    //al crear el Objeto , declaramos una variable para poner el indice en 0 ya que inica por la primer pregunta
    /**
     * 
     * @param{Question[]}questions
     * 
     */
    constructor(questions){//le pasamos las preguntas ya creadas como Objetos, importadas del archivo Question
        this.questions = questions
    }

    /**
     * 
     * 
     * @returns {Question} la question encontrada
     * 
     */
    getQuestionIndex(){
        //Inicia con la pregunta en el indice 0
        return this.questions[this.questionIndex];
    }
    isEnded(){
        return this.questions.length === this.questionIndex;
        //si el index de la pregunta es = a la logitud de las preguntas se termina el juego
    }
    showTime(tiempo){
        const ui = new UI;
        const elementoContador = document.querySelector("#numero_contador")
        elementoContador.classList.add("contador");
        let cantidad = tiempo;
        let contador = setInterval(()=>{
            cantidad-=1;
            if (!this.isEnded() && cantidad > 0){
                elementoContador.textContent = `${cantidad}`
            }
            else if (this.isEnded() && cantidad > 0) {
                clearInterval(contador)
                elementoContador.style.visibility = "hidden";
            }
            else if (cantidad === 0) {
                clearInterval(contador)
                elementoContador.style.visibility = "hidden";
                ui.showScore(this.score)
                detenerMusica()
            }
            
        },1000)
    }

    guess(answer){
        //una vez me pasa una respuesta  y pasa a la siguiente pregunta
        let isCorrect = this.getQuestionIndex().correctAnswer(answer);
        if(isCorrect){
            audioCorrecto.play()
            this.score++;
            //y en el caso de que la respuesta sea correcta(true) aumenta el score en +1
        }
        else if (!isCorrect) {
            audioError.play()
        }
        this.questionIndex++;//aumentamos al index para pasar a la siguiente pregunta
    }
}
