import React, { useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';

export default function ItemCategories() {
  const { itemCategories } = useContext(AppContext);

  return (
    <div>
      {itemCategories && Object.keys(itemCategories).map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {JSON.stringify(itemCategories[key])}
        </div>
      ))}
    </div>
  );
}
