import React, { useEffect, useState, useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';

export default function RawOutput() {
  const {selectedItemWorld, selectedGUID } = useContext(AppContext);
  const [Component, setComponent] = useState(null);

  const outputPage2 = selectedItemWorld?.outputPage2;

  useEffect(() => {
    async function loadComponent() {
      if (outputPage2 && selectedGUID) {
        const { default: dynamicComponent } = await import(`src/components/admin/${outputPage2}`);
        setComponent(() => dynamicComponent);
      }
    }
    loadComponent();
  }, [selectedGUID,outputPage2]);
  

  if (!Component) return null;

  return <Component />;
}
  