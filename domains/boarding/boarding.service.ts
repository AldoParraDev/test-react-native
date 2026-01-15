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

    console.log("url de api::", `/travel?date=${todayFormatted}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
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

    console.log("url de api 2::", `/travel/${travelId}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
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

// OBTENER PASAJERO POR ID
export const getPassengerById = async (idPassenger: string) => {
  try {
    const response = await api.get(`/passenger/${idPassenger}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    let message = "Error al obtener el pasajero";

    if (error.response?.data?.error) {
      message = error.response.data.error;
    }

    return {
      success: false,
      error: message,
    };
  }
};

// VALIDAR QR
export const validateQrTransaction = async (
  code: string,
  travel_id: string
) => {
  console.log("Validando QR con código:", code, "y travel_id:", travel_id);

  try {
    const response = await api.patch(`/passenger/boarding-status`, {
      code,
      travel_id,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log("ERROR:::", error);

    return {
      success: false,
      error: error.response?.data?.error,
    };
  }
};
