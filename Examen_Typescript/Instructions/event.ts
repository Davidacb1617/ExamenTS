import { Spaceship } from './spaceship.js';

// Define an enum for the types of events
export enum EventType {
  Collision = 'Choque',
  Meteorite = 'Meteorito',
  BlackHole = 'Agujero Negro',
  AlienAttack = 'Ataque Alienígena',
}

// Generic function to randomly select an event
export function getRandomEvent(): EventType {
  // Array of possible event types
  const eventTypes: EventType[] = [
    EventType.Collision,
    EventType.Meteorite,
    EventType.BlackHole,
    EventType.AlienAttack,
  ];

  // Choose a random event type from the array
  const randomEventType: EventType =
    eventTypes[Math.floor(Math.random() * eventTypes.length)];

  // Return the random event
  return randomEventType;
}

export class Event {
  public name: EventType;
  private spaceship: Spaceship['capacity'];

  constructor(name: EventType, spaceship: Spaceship['capacity']) {
    this.name = name;
    this.spaceship = spaceship;
  }
}
