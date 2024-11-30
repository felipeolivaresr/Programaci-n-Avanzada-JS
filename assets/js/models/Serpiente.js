import { Animal } from './Animal.js';

export class Serpiente extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }
    
    sisear() {
        const audio = new Audio(`/sounds/${this._sonido}`);
        audio.play();
    }
}