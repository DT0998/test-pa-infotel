import React, { createContext, useState } from "react";

export const LoginContext = createContext<ILoginContext | undefined>(undefined);

const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("");

  return (
    <LoginContext.Provider value={{ name }}>{children}</LoginContext.Provider>
  );
};

interface ILoginContext {
  name: string;
}

export default LoginProvider;
