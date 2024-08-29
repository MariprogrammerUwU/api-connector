// Task 2: listUsers()
import { getServerURL } from "./task1.js";

export async function listUsers() {
  try {
    // Haz una solicitud HTTP GET al servidor para obtener la lista de usuarios
    const url = getServerURL();
    const response = await fetch(url + "/users");

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convierte la respuesta en un objeto JavaScript, en este caso, un array de usuarios
    const users = await response.json();

    // Verifica si la respuesta tiene datos y no está vacía
    if (!Array.isArray(users) || users.length === 0) {
      console.log("No users found or response is not an array.");
      return;
    }

    // Recorre el array de usuarios y crea un string formateado para cada uno
    const formattedUsers = users
      .map(
        (user) =>
          `{\n  id: ${user.id},\n  first_name: '${user.first_name}',\n  last_name: '${user.last_name}',\n  email: '${user.email}'\n}`
      )
      .join(",\n");

    // Imprime en la consola el array de usuarios formateado como un string
    console.log(`[\n${formattedUsers}\n]`);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Llama a la función para listar usuarios
listUsers();

