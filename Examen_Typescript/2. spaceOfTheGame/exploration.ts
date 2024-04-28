// Define the Exploration with the direction to go
export class Exploration {
  direction: 'norte' | 'sur' | 'este' | 'oeste';

  constructor(direction: 'norte' | 'sur' | 'este' | 'oeste') {
    this.direction = direction;
  }
}
