import { $authHost } from "../../../../processes/http/http";
import { jwtDecode } from "jwt-decode";

export const GetUserRequest = async () => {
  // try {
  //   const JWT = jwtDecode(localStorage.getItem("token"));
  //   const res = await $authHost.get(`/customer/${JWT.userId}/requests`);
  //   return res;
  // } catch (e) {
  //   console.log(e);
  // }
  console.log("hello");
};
export const GetUserBooking = async () => {
  // try {
  //   const JWT = jwtDecode(localStorage.getItem("token"));
  //   const res = await $authHost.get(`/customer/${JWT.userId}/bookings`);
  //   return res;
  // } catch (e) {
  //   console.log(e);
  // }
  console.log("hello");
};

export const GetDachaUserRequestPageAPI = async (id) => {
  // if (Array.isArray(id)) {
  //   const promises = id.map(async (dachasId) => {
  //     try {
  //       const res = await $authHost.get(`/dacha/${dachasId}`);
  //       return res.data;
  //     } catch (e) {
  //       console.log(e);
  //       throw e; // Xatolarni qaytarish
  //     }
  //   });

  //   try {
  //     const results = await Promise.all(promises);
  //     return results; // Barcha natijalarni qaytarish
  //   } catch (error) {
  //     console.error("Error fetching dachas:", error);
  //     throw error; // Xatolarni qaytarish
  //   }
  // } else {
  //   try {
  //     const res = await $authHost.get(`/dacha/${id}`);
  //     console.log(res);
  //     return res.data;
  //   } catch (e) {
  //     console.log(e);
  //     throw e; // Xatolarni qaytarish
  //   }
  // }
  console.log("hello");
};
