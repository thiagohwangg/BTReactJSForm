import React, { createContext, useContext, useState } from 'react';

const RenderContext = createContext();

export const useRenderContext = () => {
  return useContext(RenderContext);
}

export const RenderProvider = ({ children }) => {
  const [render, setRender] = useState();

  return (
    <RenderContext.Provider value={{ render, setRender }}>
      {children}
    </RenderContext.Provider>
  );
}
