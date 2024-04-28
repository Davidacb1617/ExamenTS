### Examen Práctico de TypeScript: Simulador de Exploración Espacial en Consola

**Objetivo del Ejercicio:**

Desarrollar un simulador de exploración espacial en consola utilizando TypeScript, centrándose en la lógica y estructuras de datos

**Descripción del Simulador:**

El jugador gestiona una nave espacial en un entorno de texto, explorando planetas y enfrentando eventos aleatorios. El objetivo es gestionar recursos y tomar decisiones estratégicas para mantener la nave operativa y segura.

### Instrucciones:

1. **Modelado de Datos con TypeScript:**

- **Nave Espacial:** Utiliza una **interfaz** para definir las propiedades esenciales de la nave, como salud, capacidad de carga y velocidad. Esto asegura que todas las instancias de la nave cumplan con una estructura específica.

- **Planeta:** Implementa una **clase** para crear distintos planetas. Cada planeta puede tener propiedades como tipo de recurso y peligros asociados, definidos mediante **tipos primitivos** y **enums** para categorizarlos eficientemente.

- **Evento:** Usa otra **clase** para representar eventos aleatorios que la nave puede encontrar. Estos eventos pueden afectar diferentes aspectos de la nave y la misión.

**Conceptos Utilizados:** Interfaces, Clases, Tipos Primitivos, Enums.

2. **Funcionalidades del Simulador:**

- **Exploración:** Implementa una función que permita navegar entre diferentes sectores del espacio, usando **tipos de unión** para representar las posibles direcciones (norte, sur, este, oeste).

- **Recolección de Recursos:** Utiliza **genéricos** para diseñar una función flexible que pueda manejar diferentes tipos de recursos. Esto permite reutilizar la misma función para diferentes tipos de planetas y recursos.

- **Manejo de Eventos:** Desarrolla un sistema que reaccione a eventos aleatorios utilizando **tipos de intersección** para extender funcionalidades entre eventos similares, permitiendo una integración más compleja y versátil de comportamientos.

**Conceptos Utilizados:** Funciones, Genéricos, Tipos de Unión, Tipos de Intersección.

3. **Logística y Navegación:**

- **Decisiones del Usuario:** Captura entradas del usuario desde la consola, usando tipos como `string` o `number`, y realiza un **manejo de errores** para validar las entradas y responder adecuadamente a errores de input.

- **Simulación de Viaje:** Crea una función que simule el paso del tiempo y la distancia, modificando el estado del simulador basado en las decisiones del usuario y los eventos aleatorios.

**Conceptos Utilizados:** Tipos Primitivos, Manejo de Errores.

4. **Organización del Código con Módulos y Espacios de Nombres:**

- **Módulos:** Separa la lógica del simulador en módulos distintos (por ejemplo, navegación, gestión de eventos, interfaz de usuario), facilitando la mantenibilidad y escalabilidad del código.

- **Espacios de Nombres:** Organiza los módulos y clases relacionadas dentro de espacios de nombres para evitar colisiones de nombres y mejorar la estructura del proyecto.

**Conceptos Utilizados:** Módulos, Espacios de Nombres.

### Ejecución del Simulador:

- Use nodejs para ejecutar su codigo
