export const obtenerAnimales = async () => {
    try {
        
        const animalesData = {
            "animales": [
                {
                    "name": "Leon",
                    "imagen": "Leon.png",
                    "sonido": "Rugido.mp3"
                },
                {
                    "name": "Lobo",
                    "imagen": "Lobo.jpg",
                    "sonido": "Aullido.mp3"
                },
                {
                    "name": "Oso",
                    "imagen": "Oso.jpg",
                    "sonido": "Gruñido.mp3"
                },
                {
                    "name": "Serpiente",
                    "imagen": "Serpiente.jpg",
                    "sonido": "Siseo.mp3"
                },
                {
                    "name": "Aguila",
                    "imagen": "Aguila.png",
                    "sonido": "Chillido.mp3"
                }
            ]
        };

        try {
            const response = await fetch('./animales.json');
            if (response.ok) {
                const data = await response.json();
                return data.animales;
            }
        } catch (error) {
            console.warn('Usando datos de respaldo:', error);
        }

       
        return animalesData.animales;
    } catch (error) {
        console.error('Error al obtener animales:', error);
        throw error;
    }
}