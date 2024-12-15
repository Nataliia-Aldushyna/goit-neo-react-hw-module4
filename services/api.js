import api from "./api";

export async function searchImage(query, page) {
  const url = "/search/photos";
  const { data } = await api.get(url, {
    params: {
      query,
      page,
      per_page: 12,
    },
  });
  return data;
}
