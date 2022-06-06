//Creamos un Objeto principal con sus atributos
export class Question{
    /**
   *
   * @param {string} //el texto de la pregunta
   * @param {string[]} //un array de opciones
   * @param {string} //la respuesta correcta
   * @param {img}//una imagen de la pregunta
   */
    constructor(text,choice,answer,img){
        this.text = text;//la pregunta que se le pasara
        this.choice = choice;//las opciones que se le pasara
        this.answer = answer;//la respuesta correcta que se le pasara
        this.img = img;//la img que se la pasara
    }

    /**
   *
   * @param {string} //la opcion seleccionada
   * @returns {boolean} retorna un valor booleano
   */
    correctAnswer(choice){//la opcion que elegio el usuario
        return choice === this.answer;// retorna true si coincide con la respuesta correcta
    }
}
