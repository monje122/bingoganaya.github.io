// Importar Supabase
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://supabase.com/dashboard/org/uiynoafaatizzbcdfwir/general'; // Reemplaza con tu URL de Supabase
const supabaseKey = '159263487'; // Reemplaza con tu clave pública
const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function cargarNumerosOcupados() {
    const { data, error } = await supabaseClient.from('numeros_ocupados').select('numero');
    if (error) {
        console.error('Error al obtener números ocupados:', error);
        return new Set();
    }
    return new Set(data.map(row => row.numero));
}

async function guardarNumeroOcupado(numero) {
    const { error } = await supabaseClient.from('numeros_ocupados').insert([{ numero }]);
    if (error) {
        console.error('Error al guardar número ocupado:', error);
    }
}

async function eliminarNumeroOcupado(numero) {
    const { error } = await supabaseClient.from('numeros_ocupados').delete().match({ numero });
    if (error) {
        console.error('Error al eliminar número ocupado:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const numerosOcupados = await cargarNumerosOcupados();
    const numerosContainer = document.getElementById('numerosContainer');

    for (let i = 1; i <= 999; i++) {
        const numeroDiv = document.createElement('div');
        numeroDiv.classList.add('numero');
        numeroDiv.textContent = i;
        
        if (numerosOcupados.has(i)) {
            numeroDiv.classList.add('ocupado');
        } else {
            numeroDiv.classList.add('libre');
        }
        
        numeroDiv.addEventListener('click', async () => {
            if (numeroDiv.classList.contains('ocupado')) {
                await eliminarNumeroOcupado(i);
                numeroDiv.classList.remove('ocupado');
                numeroDiv.classList.add('libre');
            } else {
                await guardarNumeroOcupado(i);
                numeroDiv.classList.add('ocupado');
                numeroDiv.classList.remove('libre');
            }
        });
        
        numerosContainer.appendChild(numeroDiv);
    }
});
