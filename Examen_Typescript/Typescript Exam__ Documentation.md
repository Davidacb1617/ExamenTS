# Desarrollo del juego

### Prerrequisitos

- Instalar la biblioteca "Inquirer"

Para instalar esta biblioteca debemos poner dentro de la terminal el comando:

```bash
npm install --save-dev inquirer
```

- Instalar la biblioteca "chalk"

Para instalar esta biblioteca debemos poner dentro de la terminal el comando:

```bash
npm install chalk
```

Se puede poner la versión que desee después de la palabra clave "chalk", de la siguiente manera:

```bash
npm install chalk@4.1.2
```

La versión que yo usé fue la 4.1.2, pero la última versión vigente el día de hoy 28/04/2024 es la versión 5.3.0.

- Instalar los tipos de "Inquirer"

Para instalar estos tipos debemos ingresar el siguiente comando en la terminal:

```bash
npm install --save-dev @types/inquirer
```

Al utilizar `@types/inquirer`, estamos instalando los tipos de TypeScript para la biblioteca **"Inquirer"**, lo que te permite aprovechar las características de TypeScript mientras trabajas con Inquirer en tu proyecto Node.js. Esto mejora la legibilidad y la mantenibilidad del código, ya que TypeScript puede detectar y prevenir errores comunes durante el desarrollo.

## ¿Para que sirven?

- **INQUIRER**
  **"Inquirer"** es una biblioteca para Node.js que simplifica la creación de interfaces de línea de comandos interactivas, permitiendo a los desarrolladores hacer preguntas al usuario y recibir respuestas de manera estructurada y amigable.

- **CHALK**
  **"Chalk"** es una biblioteca para Node.js que facilita la coloración y estilización del texto en la consola. Permite a los desarrolladores aplicar estilos como colores, estilos de texto y fondos a los mensajes de la consola, lo que mejora la legibilidad y la presentación de la información en las aplicaciones de línea de comandos.

## Análisis de código

Este código fue escrito totalmente con Typescript, siguiendo el formato proporcionado por el Ing. Jonnathan Vallejo.
El formato lo puedes encontrar dentro de este repositorio, en el archivo llamado `Game_Instructions.md`.

1. **Importación de módulos y definición de clases**: El código comienza importando varios módulos y definiendo varias clases, como `Player`, `Mission`, `Planet`, `Exploration`, `Event`, `ClickEvent`, `DoubleClickEvent`, `HoverEvent`, `DragEvent` entre otros. Estas clases se utilizan para representar las propiedades de los planetas, las direcciones de exploración, los diferentes eventos que pueden ocurrir durante el juego, la nave espacial que manejamos, etc. Además se importaron las bibliotecas "**Inquirer**" y "**Chalk**" para el diseño del juego y la funcionalidad del mismo.

2. **Presentación del juego**: Después de las importaciones y definiciones de clases, el código muestra un ASCII art de una nave espacial utilizando la librería `chalk` para darle color. También se muestra el nombre del juego, el cual se llama "**Spaceship Game**".

3. **Ingreso del nombre del jugador y selección de misión**: Se le solicita al usuario que ingrese su nombre y seleccione una misión entre "Investigación" o "Recolectar Recursos".

4. **Creación de instancias**: En esta sección, se crean instancias de las clases `Player`, `Mission`, `Planet`, `Exploration`, `Event` y `Resources` con valores predeterminados o aleatorios.

5. **Bucle principal del juego**: Comienza un bucle `do-while` infinito que representa el ciclo principal del juego.

6. **Misión de Investigación**: Si el usuario seleccionó la misión "Investigación", se le solicita que elija un planeta para visitar (Marte, Venus o Júpiter). Después, se le pregunta si desea investigar el planeta. Si acepta, se inicia un bucle interno donde se le pide al usuario que seleccione una dirección para explorar. Durante la exploración, pueden ocurrir eventos aleatorios que dañan la nave. La exploración es aleatoria, por lo que se puede perder y ganar, dependiendo de tu suerte.

7. **Misión de Recolectar Recursos**: Si el usuario seleccionó la misión "Recolectar Recursos", se sigue un flujo similar al de la misión de Investigación, pero en lugar de buscar vida humana, el objetivo es encontrar y recolectar un recurso específico (agua). Durante la exploración, el jugador también puede encontrar recursos aleatorios y decidir si los recolecta o no. Al igual que en la misión de Investigación, pueden ocurrir eventos aleatorios que el usuario puede manejar ingresando los comandos específicos(atacar, permanecer estático, turbo, mover nave o salir), cada comando realiza una acción diferente.

8. **Manejo de eventos**: Cuando el usuario ingresa un comando para interactuar con un evento, se llama a la función `handleEvent` y se pasa el evento correspondiente (`ClickEvent`, `DoubleClickEvent`, `HoverEvent` o `DragEvent`) como argumento.

9. **Condiciones de finalización**: El juego finaliza cuando se completa la misión (encontrar vida humana o recolectar el recurso "agua") o cuando la nave, la tripulación o la vida del jugador es de 0.

Dentro del juego el usuario asume el rol de un jugador que controla una nave y una tripulación. El objetivo del juego varía según la misión seleccionada (investigación o recolección de recursos), y el jugador debe tomar decisiones y enfrentar eventos aleatorios durante la exploración de los planetas.
