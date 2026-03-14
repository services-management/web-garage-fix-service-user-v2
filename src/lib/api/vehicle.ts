import { fetchAPI } from "./client";

export interface VehicleMake {
    id: number;
    name: string;
    is_active: boolean;
}

export interface VehicleModel {
    id: number;
    name: string;
    make: VehicleMake;
    is_active: boolean;
}

export interface VehicleDetail {
    id: number;
    model_id: number;
    year: number;
    engine: string;
    vehicle_type: 'Sedan' | 'SUV' | 'Truck' | 'Hatchback' | 'Coupe' | string;
    fuel_type: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric' | string;
    drive_type: 'FWD' | 'RWD' | 'AWD' | '4WD' | string;
    transmission: 'Manual' | 'Automatic' | string;
    is_active: boolean;
    model: VehicleModel;
}

// GET /vehicles/makes
export async function getAllMakes(): Promise<VehicleMake[]> {
    return fetchAPI('/vehicles/makes');
}

// GET /vehicles/makes/{make_id}/models
export async function getModelsByMake(makeId: number): Promise<VehicleModel[]> {
    return fetchAPI(`/vehicles/makes/${makeId}/models`);
}

// GET /vehicles/models/{model_id}/years
export async function getYearsByModel(modelId: number): Promise<number[]> {
    return fetchAPI(`/vehicles/models/${modelId}/years`);
}

// GET /vehicles/filter?model_id=&year=
// Returns a list of vehicle IDs matching the model + year
export async function getVehicleConfigurations(modelId: number, year: number): Promise<number[]> {
    return fetchAPI(`/vehicles/filter?model_id=${modelId}&year=${year}`);
}

// GET /vehicles/{vehicle_id}
// Returns full vehicle details including engine, fuel type, transmission, etc.
export async function getVehicleById(vehicleId: number): Promise<VehicleDetail> {
    // Ensure vehicleId is an integer - the API may return decimal IDs that need to be floored
    const integerId = Math.floor(vehicleId);
    return fetchAPI(`/vehicles/${integerId}`);
}

// ─── Service Estimate Prices ────────────────────────────────────────────────

export interface ServiceProduct {
    product_id: number;
    product_name: string;
    price_per_unit: string;
    quantity_required: string;
    total_product_price: string;
}

export interface ServiceEstimate {
    service_id: number;
    service_name: string;
    service_type: 'Home' | 'Garage';
    base_labor_price: string;
    products: ServiceProduct[];
    total_estimated_price: string;
    total_duration_minutes: number;
}

// GET /service/estimate-prices?vehicle_id=&service_type=
export async function getServiceEstimates(
    vehicleId: number,
    serviceType: 'Home' | 'Garage'
): Promise<ServiceEstimate[]> {
    // Ensure vehicleId is an integer - the API may return decimal IDs that need to be floored
    const integerId = Math.floor(vehicleId);
    return fetchAPI(`/service/estimate-prices?vehicle_id=${integerId}&service_type=${serviceType}`);
}