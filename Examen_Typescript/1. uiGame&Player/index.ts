import chalk from 'chalk';
import inquirer from 'inquirer';
import { Spaceship } from '../2. spaceOfTheGame/spaceship.js';
import { Planet } from '../2. spaceOfTheGame/world.js';
import { DangerLevel } from '../2. spaceOfTheGame/world.js';
import { Exploration } from '../2. spaceOfTheGame/exploration.js';
import { Event, EventType } from '../3. eventManagement/event.js';
import { ClickEvent } from '../3. eventManagement/event_management.js';
import { DoubleClickEvent } from '../3. eventManagement/event_management.js';
import { HoverEvent } from '../3. eventManagement/event_management.js';
import { DragEvent } from '../3. eventManagement/event_management.js';
import { handleEvent } from '../3. eventManagement/event_management.js';
import { getRandomResourceWithQuantity } from '../2. spaceOfTheGame/resources_collection.js';
import { ResourceWithQuantity } from '../2. spaceOfTheGame/resources_collection.js';
import { getRandomEvent } from '../3. eventManagement/event.js';

// Define the Player and its properties
class Player {
  name: string;
  people: Spaceship['capacity'];
  heatlh: number = 100;
  spaceshipHealth: Spaceship['health'] = 100;
  speed: Spaceship['speed'] = 500;

  constructor(name: string, people: Spaceship['capacity']) {
    this.name = name;
    this.people = people;
  }

  // Define the Player methods
  spaceshipDamage() {
    this.spaceshipHealth -= 15;
  }

  playerDamage() {
    this.heatlh -= 20;
  }

  tripulationDamage() {
    const randomQuantityOfTripaltion: number =
      Math.floor(Math.random() * 4) + 1;
    this.people -= randomQuantityOfTripaltion;
    return this.people;
  }
}

// Define the Mission to be completed
class Mission {
  name: string;
  description: string;
  spaceshipHealth: Spaceship['health'] = 100;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
// SPACESHIP ASCII Art
//DO NOT MODIFY || THE ASCII ART ONLY WORKS IN JAVASCRIPT (I THINK SO)
console.log(
  chalk.bold.green(`

       !\r\n       !\r\n       ^\r\n      \/ \\\r\n     \/___\\\r\n    |=   =|\r\n    |     |\r\n    |     |\r\n    |     |\r\n    |     |\r\n    |     |\r\n    |     |\r\n    |     |\r\n    |     |\r\n    |     |\r\n   \/|##!##|\\\r\n  \/ |##!##| \\\r\n \/  |##!##|  \\\r\n|  \/ ^ | ^ \\  |\r\n| \/  ( | )  \\ |\r\n|\/   ( | )   \\|\r\n    ((   ))\r\n   ((  :  ))\r\n   ((  :  ))\r\n    ((   ))\r\n     (( ))\r\n      ( )\r\n       .\r\n       .\r\n       .


\r\n ______  ______  ______  ______  ______  ______  __  __  __  ______  \r\n\/\\  ___\\\/\\  == \\\/\\  __ \\\/\\  ___\\\/\\  ___\\\/\\  ___\\\/\\ \\_\\ \\\/\\ \\\/\\  == \\ \r\n\\ \\___  \\ \\  _-\/\\ \\  __ \\ \\ \\___\\ \\  __\\\\ \\___  \\ \\  __ \\ \\ \\ \\  _-\/ \r\n \\\/\\_____\\ \\_\\   \\ \\_\\ \\_\\ \\_____\\ \\_____\\\/\\_____\\ \\_\\ \\_\\ \\_\\ \\_\\   \r\n  \\\/__________  ______\\\/__\\\/_____\/_______\/\\\/_____\/\\\/_\/\\\/_\/\\\/_\/\\\/_\/   \r\n       \/\\  ___\\\/\\  __ \\\/\\ \"-.\/  \\\/\\  ___\\                            \r\n       \\ \\ \\__ \\ \\  __ \\ \\ \\-.\/\\ \\ \\  __\\                            \r\n        \\ \\_____\\ \\_\\ \\_\\ \\_\\ \\ \\_\\ \\_____\\                          \r\n         \\\/_____\/\\\/_\/\\\/_\/\\\/_\/  \\\/_\/\\\/_____\/                          \r\n                                                                     \r\n


`)
);

// Player Name & Mission Selection
let player = await inquirer.prompt({
  type: 'input',
  name: 'name',
  message: 'Ingresa tu nombre:',
  //Validate the name input by the user
  validate: (input) => {
    if (input.trim() === '') {
      return 'El nombre no puede estar vacío';
    }
    return true;
  },
});

let mission = await inquirer.prompt({
  type: 'list',
  name: 'select',
  message: 'Selecciona la misión que quieres realizar:',
  choices: ['Investigación', 'Recolectar Recursos'],
});

// Gather Data
//PLAYER
let p1 = new Player(player.name, 10);

//MISSIONS
let m1 = new Mission(
  mission.select,
  'Investigar el planeta en busca de vida humana'
);
let m2 = new Mission(mission.select, 'Recolectar recursos dentro del planeta');
let m3 = new Mission(
  mission.select,
  'Entregar recursos a otras bases espaciales'
);

//RANDOM RESOURCES
const randomResourceAndQuantity: ResourceWithQuantity =
  getRandomResourceWithQuantity();

//RANDOM EVENTS
const randomEvent: EventType = getRandomEvent();

//STATIC EVENT
const staticEvent = new Event(randomEvent, p1.people);

//PLANETS
let planet1 = new Planet(
  'Marte',
  randomResourceAndQuantity.resource,
  DangerLevel.low
);
let planet2 = new Planet(
  'Venus',
  randomResourceAndQuantity.resource,
  DangerLevel.medium
);
let planet3 = new Planet(
  'Jupiter',
  randomResourceAndQuantity.resource,
  DangerLevel.high
);

//DIRECTIONS
const direction1 = new Exploration('norte');
const direction2 = new Exploration('sur');
const direction3 = new Exploration('este');
const direction4 = new Exploration('oeste');

//GAME LOOP

do {
  // Investigate Mission
  console.log(chalk.bold.green(`Te encuentras dentro de la nave ${p1.name}`));
  console.log(
    chalk.bold.green(`La nave cuenta con una vida de ${p1.spaceshipHealth}`)
  );
  console.log(
    chalk.bold.green(
      `La nave tiene un motor espacial avanzado, el cuál te permite mantener siempre la misma velocidad de ${p1.speed} km/h`
    )
  );
  if (mission.select === 'Investigación') {
    console.log(
      chalk.bold.green(
        `Hola ${p1.name}, la misión del día de hoy es: ${m1.name}`
      )
    );
    console.log(
      chalk.bold.green(
        `La nave cuenta con una tripulación de: ${p1.people} personas`
      )
    );
    console.log(chalk.bold.yellow(`Descripción: ${m1.description}`));
    let planet = await inquirer.prompt({
      type: 'list',
      name: 'select',
      message: 'Selecciona el planeta que quieres visitar:',
      choices: [planet1.name, planet2.name, planet3.name],
    });
    console.log(
      chalk.bold.green(`Has seleccionado el planeta: ${planet.select}`)
    );
    //MARS SELECTION
    if (planet.select === 'Marte') {
      console.log(
        `Has llegado a ${planet1.name} ${p1.name} junto a tu tripulación de ${p1.people} personas`
      );
      console.log(
        `Dentro de el planeta ${planet1.name}, existe una gran cantidad de ${planet1.resourceType} pero es un planeta ${planet1.dangerLevel} por lo que no debes preocuparte mucho`
      );
      let ask = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: '¿Quieres investigar el planeta Marte?',
      });
      if (ask.confirm == true) {
        console.log(chalk.bold.yellow('Investigando...'));
      }
      do {
        if (ask.confirm === true) {
          let num = Math.floor(Math.random() * 2);
          let exploration = await inquirer.prompt({
            type: 'list',
            name: 'direction',
            message: 'Selecciona la dirección a explorar:',
            choices: [
              direction1.direction,
              direction2.direction,
              direction3.direction,
              direction4.direction,
            ],
          });
          if (num > 0) {
            p1.spaceshipDamage();
            console.log(
              chalk.bold.red(
                `Tu nave ha sido dañada, tu salud actual es de: ${p1.spaceshipHealth}`
              )
            );
          }
          if (num <= 0) {
            console.log(
              chalk.bold.green('Misión completada, has encontrado vida humana')
            );
            process.exit();
          }
          if (p1.spaceshipHealth <= 0) {
            console.log(chalk.bold.red('Tu nave ha sido destruida'));
            process.exit();
          }
        } else if (ask.confirm == false) {
          console.log(
            chalk.bold.red('Misión cancelada, regresando a el Planeta Tierra')
          );
          process.exit();
        }
      } while (true);
    }
    //VENUS SELECTION
    if (planet.select === 'Venus') {
      console.log(
        `Has llegado a ${planet2.name} ${p1.name} junto a tu tripulación de ${p1.people} personas`
      );
      console.log(
        `Dentro de el planeta ${planet2.name}, existe una gran cantidad de ${planet2.resourceType} pero es un planeta ${planet2.dangerLevel} por lo que debes estar un poco alerta`
      );
      let ask = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: '¿Quieres investigar el planeta Marte?',
      });
      if (ask.confirm == true) {
        console.log(chalk.bold.yellow('Investigando...'));
      }
      do {
        if (ask.confirm === true) {
          let num = Math.floor(Math.random() * 2);
          let exploration = await inquirer.prompt({
            type: 'list',
            name: 'direction',
            message: 'Selecciona la dirección a explorar:',
            choices: [
              direction1.direction,
              direction2.direction,
              direction3.direction,
              direction4.direction,
            ],
          });
          if (num > 0) {
            p1.spaceshipDamage();
            console.log(
              chalk.bold.red(
                `Tu nave ha sido dañada, tu salud actual es de: ${p1.spaceshipHealth}`
              )
            );
          }
          if (num <= 0) {
            console.log(
              chalk.bold.green('Misión completada, has encontrado vida humana')
            );
            process.exit();
          }
          if (p1.spaceshipHealth <= 0) {
            console.log(chalk.bold.red('Tu nave ha sido destruida'));
            process.exit();
          }
        } else if (ask.confirm == false) {
          console.log(
            chalk.bold.red('Misión cancelada, regresando a el Planeta Tierra')
          );
          process.exit();
        }
      } while (true);
    }
    //JUPITER SELECTION
    if (planet.select === 'Jupiter') {
      console.log(
        `Has llegado a ${planet3.name} ${p1.name} junto a tu tripulación de ${p1.people} personas`
      );
      console.log(
        `Dentro de el planeta ${planet3.name}, existe una gran cantidad de ${planet3.resourceType} pero es un planeta ${planet3.dangerLevel} por lo que debes tener cuidado`
      );
      let ask = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: '¿Quieres investigar el planeta Marte?',
      });
      if (ask.confirm == true) {
        console.log(chalk.bold.yellow('Investigando...'));
      }
      do {
        if (ask.confirm === true) {
          let num = Math.floor(Math.random() * 2);
          let exploration = await inquirer.prompt({
            type: 'list',
            name: 'direction',
            message: 'Selecciona la dirección a explorar:',
            choices: [
              direction1.direction,
              direction2.direction,
              direction3.direction,
              direction4.direction,
            ],
          });
          if (num > 0) {
            p1.spaceshipDamage();
            console.log(
              chalk.bold.red(
                `Tu nave ha sido dañada, tu salud actual es de: ${p1.spaceshipHealth}`
              )
            );
          }
          if (num <= 0) {
            console.log(
              chalk.bold.green('Misión completada, has encontrado vida humana')
            );
            process.exit();
          }
          if (p1.spaceshipHealth <= 0) {
            console.log(chalk.bold.red('Tu nave ha sido destruida'));
            process.exit();
          }
        } else if (ask.confirm == false) {
          console.log(
            chalk.bold.red('Misión cancelada, regresando a el Planeta Tierra')
          );
          process.exit();
        }
      } while (true);
    }
  }

  // Recollect Resources Mission
  if (mission.select === 'Recolectar Recursos') {
    console.log(
      chalk.bold.green(
        `Hola ${p1.name}, la misión del día de hoy es: ${m1.name}`
      )
    );
    console.log(
      chalk.bold.green(
        `La nave cuenta con una tripulación de: ${p1.people} personas`
      )
    );
    console.log(chalk.bold.yellow(`Descripción: ${m1.description}`));
    let planet = await inquirer.prompt({
      type: 'list',
      name: 'select',
      message: 'Selecciona el planeta que quieres visitar:',
      choices: [planet1.name, planet2.name, planet3.name],
    });
    console.log(
      chalk.bold.green(`Has seleccionado el planeta: ${planet.select}`)
    );
    //MARS SELECTION
    if (planet.select === 'Marte') {
      console.log(
        `Has llegado a ${planet1.name} ${p1.name} junto a tu tripulación de ${p1.people} personas`
      );
      console.log(
        `Dentro de el planeta ${planet1.name}, existe una gran cantidad de ${planet1.resourceType} pero es un planeta ${planet1.dangerLevel} por lo que no debes preocuparte mucho`
      );
      let ask = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: '¿Quieres recolectar recursos en el planeta Marte?',
      });
      if (ask.confirm == true) {
        console.log(chalk.bold.yellow('Entrando en el planeta...'));
      }
      //GAME MISSION LOOP FOR MARS
      do {
        if (ask.confirm === true) {
          let num = Math.floor(Math.random() * 2);
          let exploration = await inquirer.prompt({
            type: 'list',
            name: 'direction',
            message: 'Selecciona la dirección a explorar:',
            choices: [
              direction1.direction,
              direction2.direction,
              direction3.direction,
              direction4.direction,
            ],
          });
          if (num > 0) {
            p1.playerDamage();
            console.log(
              chalk.bold.red(
                `Te has caído a un hoyo profundo, tu salud actual es de: ${p1.heatlh}`
              )
            );
          }
          if (num <= 0) {
            const randomResourceAndQuantity: ResourceWithQuantity =
              getRandomResourceWithQuantity();
            console.log(
              chalk.bold.green(
                `Has encontrado el recurso: ${randomResourceAndQuantity.resource} en una cantidad de: ${randomResourceAndQuantity.quantity}`
              )
            );
            let recollectResourceFounded = await inquirer.prompt({
              type: 'confirm',
              name: 'confirm',
              message: '¿Quieres recolectar el recurso?',
            });
            if (recollectResourceFounded.confirm == true) {
              console.log(chalk.bold.green('Recolectando recurso...'));
              console.log(
                chalk.bold.red(
                  `Mientras recolectabas el recurso ${randomResourceAndQuantity.resource}, surgió el evento ${randomEvent}`
                )
              );
              if (p1.people === 0) {
                console.log(
                  chalk.bold.red('Toda tu tripulación ha sido destruida')
                );
                process.exit();
              }
              if (p1.spaceshipHealth <= 0) {
                console.log(chalk.bold.red('Tu nave ha sido destruida'));
                process.exit();
              }
              if (staticEvent.name === 'Meteorito') {
                p1.spaceshipHealth -= 10;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un meteorito, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              } else if (staticEvent.name === 'Choque') {
                p1.spaceshipHealth -= 15;
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
              } else if (staticEvent.name === 'Agujero Negro') {
                p1.spaceshipHealth -= 20;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              } else {
                p1.spaceshipHealth -= 25;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              }

              let userInput = await inquirer.prompt({
                type: 'input',
                name: 'input',
                message:
                  'Ingresa uno de los siguientes comandos para interactuar con el evento (atacar, permanecer estático, turbo, mover nave, salir):',
              });
              const finalInput = userInput.input;
              if (finalInput === 'atacar') {
                const clickEvent: ClickEvent = {
                  type: 'atacar',
                  target: 'misiles',
                };
                console.log(
                  'Ataque realizado, haz atacado con:',
                  clickEvent.target,
                  ' haz logrado vencer al evento ',
                  staticEvent.name
                );
                handleEvent(clickEvent);
              } else if (finalInput === 'permanecer estático') {
                const hoverEvent: HoverEvent = {
                  type: 'permanecer estático',
                  position: { x: 10, y: 20 },
                };
                console.log(
                  'Movimiento realizado, tu posición a cambiado a:',
                  hoverEvent.position,
                  ' haz logrado escapar del evento ',
                  staticEvent.name
                );
                handleEvent(hoverEvent);
              } else if (finalInput === 'turbo') {
                const doubleClickEvent: DoubleClickEvent = {
                  type: 'turbo',
                  target: 'botón turbo',
                };
                console.log('Evento realizado:', doubleClickEvent.target);
                handleEvent(doubleClickEvent);
              } else if (finalInput === 'mover nave') {
                const dragEvent: DragEvent = {
                  type: 'mover nave',
                  position: { x: 50, y: 100 },
                };
                console.log(
                  'Movimiento realizado, tu posición a cambiado a:',
                  dragEvent.position,
                  ' haz logrado escapar del evento ',
                  staticEvent.name
                );
                handleEvent(dragEvent);
              } else if (finalInput === 'salir') {
                console.log(
                  chalk.bold.red('Saliste del juego. ¡Hasta la próxima!')
                );
                process.exit();
              } else {
                console.log('Comando invalido');
                process.exit();
              }
            }
            if (randomResourceAndQuantity.resource === 'agua') {
              console.log(
                chalk.bold.green(
                  'Has encontrado el recurso que necesitabas, has completado la misión'
                )
              );
              process.exit();
            }
          }
          if (p1.heatlh === 0) {
            console.log(chalk.bold.red('Tu salud ha llegado a 0, has muerto'));
            process.exit();
          }
        } else if (ask.confirm == false) {
          console.log(
            chalk.bold.red('Misión cancelada, regresando a el Planeta Tierra')
          );
          process.exit();
        }
      } while (true);
    }
    //VENUS SELECTION
    if (planet.select === 'Venus') {
      console.log(
        `Has llegado a ${planet1.name} ${p1.name} junto a tu tripulación de ${p1.people} personas`
      );
      console.log(
        `Dentro de el planeta ${planet1.name}, existe una gran cantidad de ${planet1.resourceType} pero es un planeta ${planet1.dangerLevel} por lo que no debes preocuparte mucho`
      );
      let ask = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: '¿Quieres recolectar recursos en el planeta Marte?',
      });
      if (ask.confirm == true) {
        console.log(chalk.bold.yellow('Entrando en el planeta...'));
      }
      //GAME MISSION LOOP FOR VENUS
      do {
        if (ask.confirm === true) {
          let num = Math.floor(Math.random() * 2);
          let exploration = await inquirer.prompt({
            type: 'list',
            name: 'direction',
            message: 'Selecciona la dirección a explorar:',
            choices: [
              direction1.direction,
              direction2.direction,
              direction3.direction,
              direction4.direction,
            ],
          });
          if (num > 0) {
            p1.playerDamage();
            console.log(
              chalk.bold.red(
                `Te has caído a un hoyo profundo, tu salud actual es de: ${p1.heatlh}`
              )
            );
          }
          if (num <= 0) {
            const randomResourceAndQuantity: ResourceWithQuantity =
              getRandomResourceWithQuantity();
            console.log(
              chalk.bold.green(
                `Has encontrado el recurso: ${randomResourceAndQuantity.resource} en una cantidad de: ${randomResourceAndQuantity.quantity}`
              )
            );
            let recollectResourceFounded = await inquirer.prompt({
              type: 'confirm',
              name: 'confirm',
              message: '¿Quieres recolectar el recurso?',
            });
            if (recollectResourceFounded.confirm == true) {
              console.log(chalk.bold.green('Recolectando recurso...'));
              console.log(
                chalk.bold.red(
                  `Mientras recolectabas el recurso ${randomResourceAndQuantity.resource}, surgió el evento ${randomEvent}`
                )
              );
              if (p1.people === 0) {
                console.log(
                  chalk.bold.red('Toda tu tripulación ha sido destruida')
                );
                process.exit();
              }
              if (p1.spaceshipHealth <= 0) {
                console.log(chalk.bold.red('Tu nave ha sido destruida'));
                process.exit();
              }
              if (staticEvent.name === 'Meteorito') {
                p1.spaceshipHealth -= 10;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un meteorito, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              } else if (staticEvent.name === 'Choque') {
                p1.spaceshipHealth -= 15;
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
              } else if (staticEvent.name === 'Agujero Negro') {
                p1.spaceshipHealth -= 20;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              } else {
                p1.spaceshipHealth -= 25;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              }

              let userInput = await inquirer.prompt({
                type: 'input',
                name: 'input',
                message:
                  'Ingresa uno de los siguientes comandos para interactuar con el evento (atacar, permanecer estático, turbo, mover nave, salir):',
              });
              const finalInput = userInput.input;
              if (finalInput === 'atacar') {
                const clickEvent: ClickEvent = {
                  type: 'atacar',
                  target: 'misiles',
                };
                console.log(
                  'Ataque realizado, haz atacado con:',
                  clickEvent.target,
                  ' haz logrado vencer al evento ',
                  staticEvent.name
                );
                handleEvent(clickEvent);
              } else if (finalInput === 'permanecer estático') {
                const hoverEvent: HoverEvent = {
                  type: 'permanecer estático',
                  position: { x: 10, y: 20 },
                };
                console.log(
                  'Movimiento realizado, tu posición a cambiado a:',
                  hoverEvent.position,
                  ' haz logrado escapar del evento ',
                  staticEvent.name
                );
                handleEvent(hoverEvent);
              } else if (finalInput === 'turbo') {
                const doubleClickEvent: DoubleClickEvent = {
                  type: 'turbo',
                  target: 'botón turbo',
                };
                console.log('Evento realizado:', doubleClickEvent.target);
                handleEvent(doubleClickEvent);
              } else if (finalInput === 'mover nave') {
                const dragEvent: DragEvent = {
                  type: 'mover nave',
                  position: { x: 50, y: 100 },
                };
                console.log(
                  'Movimiento realizado, tu posición a cambiado a:',
                  dragEvent.position,
                  ' haz logrado escapar del evento ',
                  staticEvent.name
                );
                handleEvent(dragEvent);
              } else if (finalInput === 'salir') {
                console.log(
                  chalk.bold.red('Saliste del juego. ¡Hasta la próxima!')
                );
                process.exit();
              } else {
                console.log('Comando invalido');
                process.exit();
              }
            }
            if (randomResourceAndQuantity.resource === 'agua') {
              console.log(
                chalk.bold.green(
                  'Has encontrado el recurso que necesitabas, has completado la misión'
                )
              );
              process.exit();
            }
          }
          if (p1.heatlh === 0) {
            console.log(chalk.bold.red('Tu salud ha llegado a 0, has muerto'));
            process.exit();
          }
        } else if (ask.confirm == false) {
          console.log(
            chalk.bold.red('Misión cancelada, regresando a el Planeta Tierra')
          );
          process.exit();
        }
      } while (true);
    }
    //JUPITER SELECTION
    if (planet.select === 'Jupiter') {
      console.log(
        `Has llegado a ${planet1.name} ${p1.name} junto a tu tripulación de ${p1.people} personas`
      );
      console.log(
        `Dentro de el planeta ${planet1.name}, existe una gran cantidad de ${planet1.resourceType} pero es un planeta ${planet1.dangerLevel} por lo que no debes preocuparte mucho`
      );
      let ask = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: '¿Quieres recolectar recursos en el planeta Marte?',
      });
      if (ask.confirm == true) {
        console.log(chalk.bold.yellow('Entrando en el planeta...'));
      }
      //GAME MISSION LOOP FOR JUPITER
      do {
        if (ask.confirm === true) {
          let num = Math.floor(Math.random() * 2);
          let exploration = await inquirer.prompt({
            type: 'list',
            name: 'direction',
            message: 'Selecciona la dirección a explorar:',
            choices: [
              direction1.direction,
              direction2.direction,
              direction3.direction,
              direction4.direction,
            ],
          });
          if (num > 0) {
            p1.playerDamage();
            console.log(
              chalk.bold.red(
                `Te has caído a un hoyo profundo, tu salud actual es de: ${p1.heatlh}`
              )
            );
          }
          if (num <= 0) {
            const randomResourceAndQuantity: ResourceWithQuantity =
              getRandomResourceWithQuantity();
            console.log(
              chalk.bold.green(
                `Has encontrado el recurso: ${randomResourceAndQuantity.resource} en una cantidad de: ${randomResourceAndQuantity.quantity}`
              )
            );
            let recollectResourceFounded = await inquirer.prompt({
              type: 'confirm',
              name: 'confirm',
              message: '¿Quieres recolectar el recurso?',
            });
            if (recollectResourceFounded.confirm == true) {
              console.log(chalk.bold.green('Recolectando recurso...'));
              console.log(
                chalk.bold.red(
                  `Mientras recolectabas el recurso ${randomResourceAndQuantity.resource}, surgió el evento ${randomEvent}`
                )
              );
              if (p1.people === 0) {
                console.log(
                  chalk.bold.red('Toda tu tripulación ha sido destruida')
                );
                process.exit();
              }
              if (p1.spaceshipHealth <= 0) {
                console.log(chalk.bold.red('Tu nave ha sido destruida'));
                process.exit();
              }
              if (staticEvent.name === 'Meteorito') {
                p1.spaceshipHealth -= 10;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un meteorito, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              } else if (staticEvent.name === 'Choque') {
                p1.spaceshipHealth -= 15;
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
              } else if (staticEvent.name === 'Agujero Negro') {
                p1.spaceshipHealth -= 20;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              } else {
                p1.spaceshipHealth -= 25;
                p1.tripulationDamage();
                console.log(
                  chalk.bold.red(
                    `Tu nave ha sido dañada por un choque, tu salud actual es de: ${p1.spaceshipHealth}`
                  )
                );
                console.log(
                  chalk.bold.red(`Tu tripulación a descendido a ${p1.people}`)
                );
              }

              let userInput = await inquirer.prompt({
                type: 'input',
                name: 'input',
                message:
                  'Ingresa uno de los siguientes comandos para interactuar con el evento (atacar, permanecer estático, turbo, mover nave, salir):',
              });
              const finalInput = userInput.input;
              if (finalInput === 'atacar') {
                const clickEvent: ClickEvent = {
                  type: 'atacar',
                  target: 'misiles',
                };
                console.log(
                  'Ataque realizado, haz atacado con:',
                  clickEvent.target,
                  ' haz logrado vencer al evento ',
                  staticEvent.name
                );
                handleEvent(clickEvent);
              } else if (finalInput === 'permanecer estático') {
                const hoverEvent: HoverEvent = {
                  type: 'permanecer estático',
                  position: { x: 10, y: 20 },
                };
                console.log(
                  'Movimiento realizado, tu posición a cambiado a:',
                  hoverEvent.position,
                  ' haz logrado escapar del evento ',
                  staticEvent.name
                );
                handleEvent(hoverEvent);
              } else if (finalInput === 'turbo') {
                const doubleClickEvent: DoubleClickEvent = {
                  type: 'turbo',
                  target: 'botón turbo',
                };
                console.log('Evento realizado:', doubleClickEvent.target);
                handleEvent(doubleClickEvent);
              } else if (finalInput === 'mover nave') {
                const dragEvent: DragEvent = {
                  type: 'mover nave',
                  position: { x: 50, y: 100 },
                };
                console.log(
                  'Movimiento realizado, tu posición a cambiado a:',
                  dragEvent.position,
                  ' haz logrado escapar del evento ',
                  staticEvent.name
                );
                handleEvent(dragEvent);
              } else if (finalInput === 'salir') {
                console.log(
                  chalk.bold.red('Saliste del juego. ¡Hasta la próxima!')
                );
                process.exit();
              } else {
                console.log('Comando invalido');
                process.exit();
              }
            }
            if (randomResourceAndQuantity.resource === 'agua') {
              console.log(
                chalk.bold.green(
                  'Has encontrado el recurso que necesitabas, has completado la misión'
                )
              );
              process.exit();
            }
          }
          if (p1.heatlh === 0) {
            console.log(chalk.bold.red('Tu salud ha llegado a 0, has muerto'));
            process.exit();
          }
        } else if (ask.confirm == false) {
          console.log(
            chalk.bold.red('Misión cancelada, regresando a el Planeta Tierra')
          );
          process.exit();
        }
      } while (true);
    }
    while (true);
  }
} while (true);
