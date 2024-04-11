import { $authHost, $host } from "../../../processes/http/http";

export const GetAllDacha = async (page) => {
  try {
    const res = await $authHost.get("dachas", { params: { page: page } });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const GetAllHostel = async (page) => {
  try {
    const res = await $host.get("hotels", { params: { page: page } });
    return res;
  } catch (e) {
    console.log(e);
  }
};
