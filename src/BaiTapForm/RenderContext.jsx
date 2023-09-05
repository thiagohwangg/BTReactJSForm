import React, { createContext, useContext, useState } from 'react';

const RenderContext = createContext();

export const useRenderContext = () => {
  return useContext(RenderContext);
}

export const RenderProvider = ({ children }) => {
  const [render, setRender] = useState();
  const [valueSearch, setValueSearch] = useState();
  const [formError, setFormError] = useState();
  return (
    <RenderContext.Provider value={{ render, setRender ,valueSearch,setValueSearch,formError,setFormError}}>
      {children}
    </RenderContext.Provider>
  );
}
