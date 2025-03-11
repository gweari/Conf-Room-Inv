import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grid, TextField, Button } from '@mui/material';
import RoomList from './RoomList';
import Pagination from './Pagination';
import LogsPage from '../LogsPage';

const RoutesComponent = ({
  searchTerm,
  setSearchTerm,
  displayedRooms,
  handleEditRoom,
  handleDeleteRoom,
  handleSort,
  sortConfig,
  currentPage,
  totalPages,
  handlePageChange,
  resetSort,
  logs,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Search Rooms"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                margin="normal"
                InputProps={{ style: { padding: '0 8px', fontSize: '0.875rem', height: '32px', lineHeight: '32px' } }}
                InputLabelProps={{ style: { fontSize: '0.875rem' }, shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <RoomList
                rooms={displayedRooms}
                handleEditRoom={handleEditRoom}
                handleDeleteRoom={handleDeleteRoom}
                handleSort={handleSort}
                sortConfig={sortConfig}
              />
            </Grid>
            <Grid item xs={12}>
              <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button variant="outlined" onClick={resetSort}>
                Reset Sort
              </Button>
            </Grid>
          </Grid>
        }
      />
      <Route path="/logs" element={<LogsPage logs={logs} />} />
    </Routes>
  );
};

export default RoutesComponent;