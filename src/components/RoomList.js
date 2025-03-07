import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RoomList = ({ rooms, handleEditRoom, handleDeleteRoom, handleSort, sortConfig }) => {
  const getSortDirection = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort('region')} style={{ padding: '4px', fontSize: '0.75rem' }}>Region {getSortDirection('region')}</TableCell>
            <TableCell onClick={() => handleSort('country')} style={{ padding: '4px', fontSize: '0.75rem' }}>Country {getSortDirection('country')}</TableCell>
            <TableCell onClick={() => handleSort('room_name_or_number')} style={{ padding: '4px', fontSize: '0.75rem' }}>Room Name/Number {getSortDirection('room_name_or_number')}</TableCell>
            <TableCell onClick={() => handleSort('floor_number')} style={{ padding: '4px', fontSize: '0.75rem' }}>Floor {getSortDirection('floor_number')}</TableCell>
            <TableCell style={{ padding: '4px', fontSize: '0.75rem' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell style={{ padding: '4px', fontSize: '0.75rem' }}>{room.region}</TableCell>
              <TableCell style={{ padding: '4px', fontSize: '0.75rem' }}>{room.country}</TableCell>
              <TableCell style={{ padding: '4px', fontSize: '0.75rem' }}>{room.room_name_or_number}</TableCell>
              <TableCell style={{ padding: '4px', fontSize: '0.75rem' }}>{room.floor_number}</TableCell>
              <TableCell style={{ padding: '4px', fontSize: '0.75rem' }}>
                <IconButton onClick={() => handleEditRoom(room)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDeleteRoom(room.id)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomList;