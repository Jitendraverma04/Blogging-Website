// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [postCount, setPostCount] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData,postData,setPostData,postCount, setPostCount }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
