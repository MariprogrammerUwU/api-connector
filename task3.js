// Task 3: addUser(first_name, last_name, email)
import { getServerURL } from "./task1.js";

// Función para agregar un usuario específico
export async function addUser(first_name, last_name, email) {
  const url = getServerURL();
  const specificUserId = '6'; // ID específico que queremos usar
  
  try {
    // Solicitar la lista de usuarios
    const response = await fetch(`${url}/users`);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const users = await response.json();

    // Verificar si el usuario con el ID 6 ya existe
    const userExists = users.some(user => user.id === specificUserId);

    if (!userExists) {
      // Crear el nuevo usuario
      const newUser = {
        id: specificUserId,
        first_name: first_name,
        last_name: last_name,
        email: email
      };

      // Enviar una solicitud POST al servidor para agregar el nuevo usuario
      const addUserResponse = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!addUserResponse.ok) {
        throw new Error(`Error al agregar el usuario: ${addUserResponse.statusText}`);
      }
      
      console.log(`Usuario agregado con éxito: ${JSON.stringify(newUser)}`);
    } else {
      console.log(`El usuario con ID ${specificUserId} ya existe.`);
    }

    // Obtener la lista actualizada de usuarios para mostrar el nuevo usuario
    const updatedResponse = await fetch(`${url}/users`);
    if (!updatedResponse.ok) {
      throw new Error(`Error en la solicitud: ${updatedResponse.statusText}`);
    }

    const updatedUsers = await updatedResponse.json();
    // Encontrar el nuevo usuario agregado
    const newlyAddedUser = updatedUsers.find(user => user.id === specificUserId);

    if (newlyAddedUser) {
      // Formatear el nuevo usuario en el formato solicitado
      console.log(`{\n  id: '${newlyAddedUser.id}',\n  first_name: '${newlyAddedUser.first_name}',\n  last_name: '${newlyAddedUser.last_name}',\n  email: '${newlyAddedUser.email}'\n}`);
    } else {
      console.log(`No se encontró el usuario con ID ${specificUserId}.`);
    }

  } catch (error) {
    console.error('Hubo un problema con la solicitud o el procesamiento:', error);
  }
}

// Ejemplo de cómo ejecutar la función
// addUser('Kai', 'Nathaniel', 'kai.n@example.org');




