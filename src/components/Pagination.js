import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      <span style={{ fontSize: "16px", margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Last</button>
    </div>
  );
};

export default Pagination;