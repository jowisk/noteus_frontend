import axios from "axios";

const apiUrl ='https://noteus-backend-h2wtgld65a-uc.a.run.app/'

const createAuthorizedRequestConfig = (token, user_id) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        user_id: user_id,
    },
});

// Retrieve token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};
const getUserIdFromLocalStorage = () => {
  return localStorage.getItem('userId');
};


export const addNote = async (note) => {
    try {
      const token = getTokenFromLocalStorage();
      const user_id = getUserIdFromLocalStorage()
      
      let res = await axios.post(`${apiUrl}notes/post`, { ...note, user_id }, createAuthorizedRequestConfig(token));  
      return res.data;
    } catch (e) {
      alert(`${e}`);
    }
  };

  export const readNotes = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const user_id = getUserIdFromLocalStorage();
  
      let res = await axios.get(`${apiUrl}notes/get`, {
        ...createAuthorizedRequestConfig(token),
        params: {
          user_id: user_id,
        },
      });
  
      return res.data;
    } catch (e) {
      alert('error' + `${e}`);
    }
  };

export const updateNote = async (uuid, updatedNoteData) => {
    try {
    const token = getTokenFromLocalStorage();
    let res = await axios.put(`${apiUrl}notes/update/${uuid}`, updatedNoteData, createAuthorizedRequestConfig(token));
    return res.data;
  } catch (e) {
    alert('error' + `${e}`);
}
};

export const deleteNote = async (uuid) => {
  try {
    const token = getTokenFromLocalStorage();
    let res = await axios.delete(`${apiUrl}notes/delete/${uuid}`, createAuthorizedRequestConfig(token));
    return res.data;
  } catch (e) {
      alert('error' + `${e}`);
    }
};

export const registerUser = async (user) => {
  try {
    let res = await axios.post(`${apiUrl}auth/register`, user);
    return res;
  } catch (e) {
    alert('error' + `${e}`);
  }
};

export const loginUser = async (user) => {
  try {
    let res = await axios.post(`${apiUrl}auth/login`, user);
    return res;
  } catch (e) {
    alert('error' + `${e}`);
  }
};