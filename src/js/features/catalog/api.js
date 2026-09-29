const API_URL = './products.json';

export async function getCatalog() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to load products: ${response.status}`);
        }
        return await response.json();

    } catch (error) {
        console.log(error);
        return null;
    }
}