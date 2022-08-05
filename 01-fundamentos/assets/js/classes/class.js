class Person {
    nombre = "";
    edad = "";
    frase = "";
    constructor(nombre, edad, frase) {
        this.nombre = nombre;
        this.edad = edad;
        this.frase = frase;
    }
}


const Spiderman = new Person("Peter Parker", 25, "Soy tu amigo spiderman!");

console.log(Spiderman);