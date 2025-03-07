import React from 'react';

const SortIndicator = ({ column, sortConfig, handleSort }) => {
  const getSortIndicator = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <span onClick={() => handleSort(column)}>
      {getSortIndicator(column)}
    </span>
  );
};

export default SortIndicator;