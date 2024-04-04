// ContextProviderWrapper.jsx

import React from "react";
import { AuthProvider } from "./auth.context";
import { DealershipProvider } from "./DealershipContext";
import { CarsProvider } from "./CarsContext";
import { LeadsProvider } from "./LeadsContext";
// import { VariablesProvider } from "./VariableContext";

const ContextProviderWrapper = ({ children }) => (
  <AuthProvider>
    {/* <VariablesProvider> */}
      <DealershipProvider>
        <CarsProvider>
          <LeadsProvider>{children}</LeadsProvider>
        </CarsProvider>
      </DealershipProvider>
    {/* </VariablesProvider> */}
  </AuthProvider>
);

export default ContextProviderWrapper;
