import React from "react";
import ProductFrom from "./ProductFrom";
import ProductTable from "./ProductTable";
import { RenderProvider } from "./RenderContext";

const BTForm = () => {
    return (
        <div className="p-5">
          <RenderProvider>
            <ProductFrom />
            <ProductTable />
          </RenderProvider>
        </div>
    );
};

export default BTForm;
