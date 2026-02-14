import React from "react";
import CustomMantineProvider from "./CustomMantineProvider";
import TanstackQueryProvider from "./TanstackQueryProvider";

interface Props {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<Props> = ({ children }) => {
  return (
    <>
      <TanstackQueryProvider>
        <CustomMantineProvider>{children}</CustomMantineProvider>
      </TanstackQueryProvider>
    </>
  );
};

export default GlobalProvider;
