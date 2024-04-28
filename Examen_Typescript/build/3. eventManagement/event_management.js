import chalk from 'chalk';
export function handleEvent(event) {
    if (event.type === 'click') {
        // Handle click event
        const clickEvent = event;
        console.log(chalk.redBright(`Atacaste con ${clickEvent.target}`));
    }
    else if (event.type === 'permanecer estático') {
        // Handle hover event
        const hoverEvent = event;
        console.log(chalk.redBright(`Permaneciste estático en la posición (${hoverEvent.position.x}, ${hoverEvent.position.y})`));
    }
    else if (event.type === 'doble click') {
        // Handle double click event
        const doubleClickEvent = event;
        console.log(chalk.redBright(`Activaste el turbo con el ${doubleClickEvent.target}`));
    }
    else if (event.type === 'mover nave') {
        // Handle drag event
        const dragEvent = event;
        console.log(chalk.redBright(`Escapaste a la posición: (${dragEvent.position.x}, ${dragEvent.position.y})`));
    }
}
// Main game loop
