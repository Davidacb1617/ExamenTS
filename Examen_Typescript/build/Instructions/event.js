// Define an enum for the types of events
export var EventType;
(function (EventType) {
    EventType["Collision"] = "Choque";
    EventType["Meteorite"] = "Meteorito";
    EventType["BlackHole"] = "Agujero Negro";
    EventType["AlienAttack"] = "Ataque Alien\u00EDgena";
})(EventType || (EventType = {}));
// Generic function to randomly select an event
export function getRandomEvent() {
    // Array of possible event types
    const eventTypes = [
        EventType.Collision,
        EventType.Meteorite,
        EventType.BlackHole,
        EventType.AlienAttack,
    ];
    // Choose a random event type from the array
    const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    // Return the random event
    return randomEventType;
}
export class Event {
    constructor(name, spaceship) {
        this.name = name;
        this.spaceship = spaceship;
    }
}
