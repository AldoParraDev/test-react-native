export interface TravelSchedule {
  copilot1_id: string | null;
  copilot2_id: string | null;
  created_at: string; // ISO 8601
  crew_id: string | null;
  date: string; // ISO 8601
  driver_id: string;
  driver_name: string;
  is_active: boolean;
  location_arrival: string;
  location_departure: string;
  route_alias: string;
  route_id: string;
  travel_id: string;
  type_service: string;
  updated_at: string; // ISO 8601
  vehicle_id: string;
  vehicle_name: string;
  vehicle_plate: string;
}
