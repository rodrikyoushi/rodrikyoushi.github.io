import { Question } from "../models/Question.js";//Importamos el objeto Question
import { data } from "./data.js";//importamos las preguntas ,array Data
import { data1 } from "./data.js"


//Recorremos el array, y por cada elemento creamos un Objeto
export const questions =data.map(({question,choice,answer,img})=> //desestructuracion objeto data
    new Question(question,choice,answer,img)) //**...data  
    questions.sort((a,b)=>Math.random() -0.5);//de esta forma el orden de las preguntas siempre cambia
    
    //Cuando creamos cada Objeto , se le asignara respectivamente cada atributo, en base al array
export const questions1 =data1.map(({question,choice,answer,img})=> //desestructuracion objeto data
    new Question(question,choice,answer,img)) //**...data  
    questions1.sort((a,b)=>Math.random() -0.5);//de esta forma el orden de las preguntas siempre cambia
    