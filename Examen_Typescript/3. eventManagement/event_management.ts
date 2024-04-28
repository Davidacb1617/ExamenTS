import chalk from 'chalk';

export type EventTypeManagement = {
  type: string;
};

export type ClickEvent = EventTypeManagement & {
  type: 'atacar';
  target: string;
};

export type HoverEvent = EventTypeManagement & {
  type: 'permanecer estático';
  position: { x: number; y: number };
};
export type DoubleClickEvent = EventTypeManagement & {
  type: 'turbo';
  target: string;
};

export type DragEvent = EventTypeManagement & {
  type: 'mover nave';
  position: { x: number; y: number };
};

export function handleEvent(event: EventTypeManagement) {
  if (event.type === 'click') {
    // Handle click event
    const clickEvent = event as ClickEvent;
    console.log(chalk.redBright(`Atacaste con ${clickEvent.target}`));
  } else if (event.type === 'permanecer estático') {
    // Handle hover event
    const hoverEvent = event as HoverEvent;
    console.log(
      chalk.redBright(
        `Permaneciste estático en la posición (${hoverEvent.position.x}, ${hoverEvent.position.y})`
      )
    );
  } else if (event.type === 'doble click') {
    // Handle double click event
    const doubleClickEvent = event as DoubleClickEvent;
    console.log(
      chalk.redBright(`Activaste el turbo con el ${doubleClickEvent.target}`)
    );
  } else if (event.type === 'mover nave') {
    // Handle drag event
    const dragEvent = event as DragEvent;
    console.log(
      chalk.redBright(
        `Escapaste a la posición: (${dragEvent.position.x}, ${dragEvent.position.y})`
      )
    );
  }
}
// Main game loop
