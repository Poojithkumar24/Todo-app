import Cookies from 'js-cookie';

type User = {
  id: string;
  username: string;
};

export const setToken = (token: string, userId: string): void => {
  // Combine token and userId as a single string and set it as a cookie
  const userToken = `${token}.${userId}`;
  Cookies.set('userToken', userToken, { expires: 2}); // Set cookie to expire in 1 day
};

export const getToken = (): string | undefined => {
  const userToken = Cookies.get('userToken');
  if (userToken) {
    const [token] = userToken.split('.');
    return token;
  }
  return undefined;
};

export const getUserId = (): string | undefined => {
  const userToken = Cookies.get('userToken');
  if (userToken) {
    const [, userId] = userToken.split('.');
    return userId;
  }
  return undefined;
};


export const removeToken = (): void => {
  Cookies.remove('userToken');
};

export const isAuthenticated = (): boolean => {
  const userToken = Cookies.get('userToken');

  return !!userToken;
};

export const getUser = (): User | undefined => {
  const userToken = Cookies.get('userToken');
  if (userToken) {
    const [, userId] = userToken.split('.');
    return { id: userId, username: 'unknown' }; // Assuming you only have the userId and not the username in the token
  }
  return undefined;
};





