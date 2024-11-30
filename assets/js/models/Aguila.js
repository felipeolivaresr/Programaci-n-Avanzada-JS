import { Animal } from './Animal.js';

export class Aguila extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }
    
    chillar() {
        const audio = new Audio(`/sounds/${this._sonido}`);
        audio.play();
    }
}