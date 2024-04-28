// Define the ResourceType and DangerLevel of the Planet
export type ResourceType = 'agua' | 'comida' | 'madera' | 'metal' | 'medicina';

export const enum DangerLevel {
  low = 'No Peligroso',
  medium = 'Medianamente Peligroso',
  high = 'Demasiado Peligroso',
}

// Create the Planet
export class Planet {
  name: string;
  resourceType: ResourceType;
  dangerLevel: DangerLevel;

  constructor(
    name: string,
    resourceType: ResourceType,
    dangerLevel: DangerLevel
  ) {
    this.name = name;
    this.resourceType = resourceType;
    this.dangerLevel = dangerLevel;
  }
}
