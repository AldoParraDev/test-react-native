import api from "../../shared/lib/api";
import { formatDateYYYYMMDD } from "../../shared/utils/formatDate";

export function confirmBoarding(data: any) {
  // futuro: validar, enviar a backend, etc
  return true;
}

// OBTENER VIAJES DEL DÍA
export const getTravelsToday = async () => {
  try {
    const todayFormatted = formatDateYYYYMMDD(new Date());
    const response = await api.get(`/travel?date=${todayFormatted}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log("GET TRAVELS ERROR:", error);

    let message = "Error al obtener los viajes";

    if (error.response?.data?.error) {
      message = error.response.data.error;
    }

    return {
      success: false,
      error: message,
    };
  }
};

// OBTENER DETALLE DE VIAJE
export const getTravelDetail = async (travelId: string) => {
  try {
    const response = await api.get(`/travel/${travelId}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log("GET TRAVEL DETAIL ERROR:", error);

    let message = "Error al obtener el detalle del viaje";

    if (error.response?.data?.error) {
      message = error.response.data.error;
    }

    return {
      success: false,
      error: message,
    };
  }
};

// OBTENER PASAJEROS POR VIAJE
export const getPassengersByTravel = async (travelId: string) => {
  try {
    const response = await api.get(`/passenger/by-travel/${travelId}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log("GET PASSENGERS ERROR:", error);

    let message = "Error al obtener los pasajeros";

    if (error.response?.data?.error) {
      message = error.response.data.error;
    }

    return {
      success: false,
      error: message,
    };
  }
};
