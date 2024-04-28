import { ResourceType } from './world.js';

// Define an interface to represent a resource with its quantity
export interface ResourceWithQuantity {
  resource: ResourceType;
  quantity: number;
}

// Generic function to randomly select a resource with its quantity
export function getRandomResourceWithQuantity(): ResourceWithQuantity {
  // Array of possible resources
  const resources: ResourceType[] = [
    'agua',
    'comida',
    'madera',
    'metal',
    'medicina',
  ];

  // Choose a random resource from the array
  const randomResource: ResourceType =
    resources[Math.floor(Math.random() * resources.length)];

  // Generate a random quantity between 1 and 100
  const randomQuantity: number = Math.floor(Math.random() * 50) + 1;

  // Return the resource with its quantity
  return { resource: randomResource, quantity: randomQuantity };
}

// Example usage: randomly select a resource with its quantity
