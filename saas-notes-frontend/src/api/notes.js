import axiosInstance from "./axiosInstance";

export const getNotes = async () => {
  const res = await axiosInstance.get("notes/");
  return res.data;
};

export const createNote = async (note) => {
  const res = await axiosInstance.post("notes/", note);
  return res.data;
};

export const deleteNote = async (id) => {
  await axiosInstance.delete(`notes/${id}/`);
};
