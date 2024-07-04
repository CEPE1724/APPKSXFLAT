const API_BASE_URL = "http://192.168.100.152:3000/api/v1"; // Usa tu IP local en lugar de localhost
//const API_BASE_URL = "http://172.16.30.159:3000/api/v1";
export const API_URLS = {
  getValEmailExist: (email) => `${API_BASE_URL}/auth/validateExistEmail/${email}`,
  postEnviarCodigo: `${API_BASE_URL}/email`,
  getValCodigo: (email, codigo) => `${API_BASE_URL}/email/${email}/${codigo}`,
  postSignUp: `${API_BASE_URL}/users/signup`,
  postSignIn: `${API_BASE_URL}/auth/signin`,
  postCreateFlat: `${API_BASE_URL}/flats`,
  getfindFullFlatById: (id) => `${API_BASE_URL}/flats/${id}`,
  getFlats: `${API_BASE_URL}/flats`,
  putUpdateFlats: (id)=> `${API_BASE_URL}/flats/${id}`,
};
