import { Animal } from './Animal.js';

export class Leon extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }
    
    rugir() {
        const audio = new Audio(`/sounds/${this._sonido}`);
        audio.play();
    }
}