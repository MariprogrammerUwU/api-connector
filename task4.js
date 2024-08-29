// Task 4: delUser(number)
import { getServerURL } from "./task1.js";

// Función para eliminar un usuario específico
export async function delUser(id) {
  const url = getServerURL();
  
  try {
    // Enviar una solicitud DELETE al servidor para eliminar el usuario
    const response = await fetch(`${url}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
    }
    
    console.log(`Usuario con ID ${id} eliminado con éxito.`);
    
  } catch (error) {
    console.error('Hubo un problema con la solicitud o el procesamiento:', error);
  }
}

// Función para eliminar varios usuarios
export async function delUsers(ids) {
  // Iterar sobre cada ID y llamar a delUser para eliminar el usuario correspondiente
  for (const id of ids) {
    await delUser(id);
  }
}

// Ejemplo de cómo ejecutar la función para eliminar usuarios con IDs específicos
async function main() {
  // Eliminar usuarios con IDs 5 y 6
  await delUsers(['5', '6']);
}

// Ejecutar el script
main();





