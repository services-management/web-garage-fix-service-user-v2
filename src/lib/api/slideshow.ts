import { fetchAPI } from './client'; // adjust path to match your project

export interface Slide {
    id: number;
    image_url: string;
    service_type: 'Home' | 'Garage';
}

// GET /slideshow/{service_type}
// service_type: 'Home' | 'Garage'
export async function getSlideshow(serviceType: 'Home' | 'Garage'): Promise<Slide[]> {
    return fetchAPI(`/slideshow/${serviceType}`);
}