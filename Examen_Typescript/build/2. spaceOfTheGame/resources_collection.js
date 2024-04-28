// Generic function to randomly select a resource with its quantity
export function getRandomResourceWithQuantity() {
    // Array of possible resources
    const resources = [
        'agua',
        'comida',
        'madera',
        'metal',
        'medicina',
    ];
    // Choose a random resource from the array
    const randomResource = resources[Math.floor(Math.random() * resources.length)];
    // Generate a random quantity between 1 and 100
    const randomQuantity = Math.floor(Math.random() * 50) + 1;
    // Return the resource with its quantity
    return { resource: randomResource, quantity: randomQuantity };
}
// Example usage: randomly select a resource with its quantity
