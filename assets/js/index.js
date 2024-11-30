import { Leon, Lobo, Oso, Serpiente, Aguila } from './models/index.js';
import { obtenerAnimales } from './animalesService.js';

((d) => {
    const animales = [];
    const btnRegistrar = d.querySelector('#btnRegistrar');
    const animalesContainer = d.querySelector('#Animales');

    console.log('Clases importadas:', { Leon, Lobo, Oso, Serpiente, Aguila });
    console.log('Función obtenerAnimales:', obtenerAnimales);

    const crearAnimal = async (tipo, edad, comentarios) => {
        try {
            console.log('Intentando crear animal:', tipo);
            const animalesData = await obtenerAnimales();
            console.log('Datos obtenidos:', animalesData);

            const animalData = animalesData.find(a => a.name === tipo);
            console.log('Datos del animal encontrado:', animalData);

            if (!animalData) {
                throw new Error(`No se encontró información para ${tipo}`);
            }

            let nuevoAnimal;
            switch(tipo) {
                case 'Leon':
                    nuevoAnimal = new Leon(tipo, edad, animalData.imagen, comentarios, animalData.sonido);
                    break;
                case 'Lobo':
                    nuevoAnimal = new Lobo(tipo, edad, animalData.imagen, comentarios, animalData.sonido);
                    break;
                case 'Oso':
                    nuevoAnimal = new Oso(tipo, edad, animalData.imagen, comentarios, animalData.sonido);
                    break;
                case 'Serpiente':
                    nuevoAnimal = new Serpiente(tipo, edad, animalData.imagen, comentarios, animalData.sonido);
                    break;
                case 'Aguila':
                    nuevoAnimal = new Aguila(tipo, edad, animalData.imagen, comentarios, animalData.sonido);
                    break;
                default:
                    throw new Error('Tipo de animal no válido');
            }
            console.log('Animal creado exitosamente:', nuevoAnimal);
            return nuevoAnimal;
        } catch (error) {
            console.error('Error en crearAnimal:', error);
            throw error;
        }
    };

    btnRegistrar.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Botón clickeado');
        
        try {
            const tipo = d.querySelector('#animal').value;
            const edad = d.querySelector('#edad').value;
            const comentarios = d.querySelector('#comentarios').value;

            console.log('Datos del formulario:', { tipo, edad, comentarios });

            if (!tipo || !edad || !comentarios) {
                alert('Por favor complete todos los campos');
                return;
            }

            const nuevoAnimal = await crearAnimal(tipo, edad, comentarios);
            animales.push(nuevoAnimal);
            
            animalesContainer.innerHTML += `
                <div class="card m-2" style="width: 200px;">
                    <img src="assets/imgs/${nuevoAnimal.img}" 
                         class="card-img-top" 
                         data-toggle="modal" 
                         data-target="#exampleModal"/>
                    <div class="card-body bg-dark">
                        <button class="btn btn-secondary btn-sonido" data-animal="${nuevoAnimal.nombre}">
                            🔊
                        </button>
                    </div>
                </div>
            `;
            
            d.querySelector('#animal').value = 'Seleccione un animal';
            d.querySelector('#edad').value = 'Seleccione un rango de años';
            d.querySelector('#comentarios').value = '';
            d.querySelector('#preview').innerHTML = '';
        } catch (error) {
            console.error('Error específico:', error);
            alert(`Error: ${error.message}`);
        }
    });

    animalesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-sonido')) {
            try {
                console.log('Botón de sonido clickeado');
                const nombreAnimal = e.target.dataset.animal;
                console.log('Animal:', nombreAnimal);
                
                const animal = animales.find(a => a.nombre === nombreAnimal);
                console.log('Animal encontrado:', animal);

                if (animal) {
                    const player = d.querySelector('#player');
                    player.src = `assets/sounds/${animal._sonido}`;
                    console.log('Reproduciendo:', player.src);
                    
                    player.play().catch(error => {
                        console.error('Error al reproducir sonido:', error);
                    });
                }
            } catch (error) {
                console.error('Error al reproducir sonido:', error);
            }
        }
    });
})(document);
