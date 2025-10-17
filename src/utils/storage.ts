export const saveItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
