import { Quiz } from "./models/Quiz.js"//Importa el Objeto Quiz que contiene los metodos de inicio,avance,finalizacion
import { UI } from "./models/UI.js"//Importa el codigo que interactua con el usuario(DOM)
import { questions } from "./data/questions.js"//codigo que interactua con la base de datos y obtiene las preguntas de hiragana
import { questions1 } from "./data/questions.js"//preguntas de Katakana
import { detenerMusica } from "./models/UI.js"

 const renderPage = (quiz,ui)=>{//vuelve a imprimir en pantalla las preguntas
    if(quiz.isEnded()){
    ui.showScore(quiz?.score);//al terminar el juego muestra el puntaje
    detenerMusica()
    }else{
    ui.showQuestion(quiz?.getQuestionIndex()?.text);//le pasamos la pregunta actual
    ui.showImg(quiz.getQuestionIndex()?.img)//imagenes de cada pregunta
    ui.showProgress(quiz.questionIndex + 1, quiz.questions.length);
    ui.showChoices(quiz.getQuestionIndex()?.choice,(currentChoice)=>{//currentChoice es el valor del boton que clikea el usuario
        quiz.guess(currentChoice);
          //ese mismo valor se le asigna a la funcion guess
        renderPage(quiz,ui)
    })
    }
}
//llamar a un array del archivo usuarios(esta dentro del login), donde obtenemos los nombres y le asignamos los puntajes con quiz.score?
function main(){
    //Una vez se ingrese al sitio, le ofrecemos al usuario las categorias de juego
    Swal.fire({
        title: `Escoge un modo de juego`,
        backdrop: "rgba(8, 38, 47, 0.4)",
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText:`Hiraganas`,
        cancelButtonText:`Katakanas`
    }).then((result)=>{
        if(result.isConfirmed){
            //en caso de que escoga Hiragana tomara las preguntas de Hiragana
            const quiz = new Quiz(questions);//crea un nuevo objeto Quiz
            const ui = new UI();// y un nuevo Objeto UI con sus respectivos atributos y metodos
            renderPage(quiz,ui)
            quiz.showTime(30);
        }else{
            //en caso de que escoga Katakanas tomara las preguntas de Katakana
            const quiz1 = new Quiz(questions1);//crea un nuevo objeto Quiz
            const ui = new UI();// y un nuevo Objeto UI con sus respectivos atributos y metodos
            renderPage(quiz1,ui)
            quiz1.showTime(30);
        }
    })
}

main();
