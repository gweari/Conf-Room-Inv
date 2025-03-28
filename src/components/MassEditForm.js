import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material';

const MassEditForm = ({
  rooms,
  selectedRooms,
  setSelectedRooms,
  handleMassEditChange,
  handleSaveMassEdit,
  setShowMassEditForm,
  massEditStep,
  setMassEditStep,
  searchTermm,
  setSearchTermm,
  filteredRoomms,
  handleNextStep,
  resetMassEditForm,
  toggleSelectRoom
}) => {
  const [localRooms, setLocalRooms] = useState([]);

  useEffect(() => {
    // Create a deep copy of the rooms to avoid direct mutation
    const roomsCopy = rooms.map(room => ({ ...room }));
    setLocalRooms(roomsCopy);
  }, [rooms]);

  const handleLocalChange = (e, roomId) => {
    const { name, value } = e.target;
    setLocalRooms(prevRooms =>
      prevRooms.map(room => (room.id === roomId ? { ...room, [name]: value } : room))
    );
  };

  const handleCancel = () => {
    resetMassEditForm();
    setLocalRooms(rooms.map(room => ({ ...room }))); // Reset local changes
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Typography variant="h4" gutterBottom>Mass Edit Rooms</Typography>

      {massEditStep === 1 ? (
        <>
          <TextField
            fullWidth
            label="Search Rooms"
            value={searchTermm}
            onChange={(e) => setSearchTermm(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          <Box sx={{ maxHeight: 200, overflowY: 'auto', border: 1, borderColor: 'divider', p: 1, mb: 2 }}>
            {filteredRoomms.map(room => (
              <FormControlLabel
                key={room.id}
                control={
                  <Checkbox
                    checked={selectedRooms.includes(room.id)}
                    onChange={() => toggleSelectRoom(room.id)}
                  />
                }
                label={room.room_name_or_number}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleNextStep} disabled={selectedRooms.length === 0}>
              Next
            </Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Box>
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Region</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Room Name</TableCell>
                  <TableCell>Zoom Room Name</TableCell>
                  <TableCell>Floor</TableCell>
                  <TableCell>Room Checked</TableCell>
                  <TableCell>Room Size</TableCell>
                  <TableCell># of Displays</TableCell>
                  <TableCell>Display Brand</TableCell>
                  <TableCell>Display Model</TableCell>
                  <TableCell>Display Size</TableCell>
                  <TableCell>Furniture Layout</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Zoom Room</TableCell>
                  <TableCell>Integrated Room</TableCell>
                  {selectedRooms.some(roomId => rooms.find(r => r.id === roomId).zoom_room) && (<>
                    <TableCell>Zoom Hardware Brand</TableCell>
                    <TableCell>Zoom Hardware Model</TableCell>
                    <TableCell>Camera Mounting</TableCell>
                  </>)}
                  {selectedRooms.some(roomId => rooms.find(r => r.id === roomId).integrated_room) && (<>
                    <TableCell>Control Processor</TableCell>
                    <TableCell>Audio Processor</TableCell>
                    <TableCell>Video System</TableCell>
                    <TableCell>AV Network Switch Brand</TableCell>
                    <TableCell>AV Network Switch Model</TableCell>
                    <TableCell>Ceiling Mic Brand/Model</TableCell>
                    <TableCell>Qty of Ceiling Mics</TableCell>
                    <TableCell>Wireless Mic Brand/Model</TableCell>
                    <TableCell>Qty of Wireless Mics</TableCell>
                    <TableCell>Ceiling Speakers Brand/Model</TableCell>
                    <TableCell>Qty of Ceiling Speakers</TableCell>
                    <TableCell>Date of Installation</TableCell>
                    <TableCell>Date of Last Check</TableCell>
                  </>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {localRooms.filter(room => selectedRooms.includes(room.id)).map((room) => (
                  <TableRow key={room.id}>
                    <TableCell><TextField fullWidth name="region" value={room.region || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="country" value={room.country || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="room_name_or_number" value={room.room_name_or_number || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="zoom_room_name" value={room.zoom_room_name || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField name="floor_number" value={room.floor_number || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell>
                      <Select fullWidth name="room_checked" value={room.room_checked || ""} onChange={(e) => handleLocalChange(e, room.id)}>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell><TextField name="room_size" value={room.room_size || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="number_of_primary_displays" value={room.number_of_primary_displays || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="primary_display_brand" value={room.primary_display_brand || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="primary_display_model" value={room.primary_display_model || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="display_size" value={room.display_size || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="room_furniture_layout" value={room.room_furniture_layout || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell><TextField fullWidth name="comments_and_additional_details" value={room.comments_and_additional_details || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    <TableCell>
                      <Checkbox
                        name="zoom_room"
                        checked={room.zoom_room}
                        onChange={(e) => handleLocalChange({ target: { name: 'zoom_room', value: e.target.checked } }, room.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        name="integrated_room"
                        checked={room.integrated_room}
                        onChange={(e) => handleLocalChange({ target: { name: 'integrated_room', value: e.target.checked } }, room.id)}
                      />
                    </TableCell>
                    {room.zoom_room && (<>
                      <TableCell><TextField fullWidth name="zoom_hardware_brand" value={room.zoom_hardware_brand || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="zoom_hardware_model" value={room.zoom_hardware_model || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="camera_wall_or_tv_mounted" value={room.camera_wall_or_tv_mounted || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    </>)}
                    {room.integrated_room && (<>
                      <TableCell><TextField fullWidth name="control_processor_details" value={room.control_processor_details || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="audio_processor_dsp_details" value={room.audio_processor_dsp_details || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="video_system_details" value={room.video_system_details || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="av_network_switch_brand" value={room.av_network_switch_brand || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="av_network_switch_model" value={room.av_network_switch_model || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="ceiling_mic_brand_model" value={room.ceiling_mic_brand_model || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="qty_of_ceiling_mics" value={room.qty_of_ceiling_mics || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="wireless_mic_brand_model" value={room.wireless_mic_brand_model || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="qty_of_wireless_mics" value={room.qty_of_wireless_mics || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="ceiling_speakers_brand_model" value={room.ceiling_speakers_brand_model || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="qty_of_ceiling_speakers" value={room.qty_of_ceiling_speakers || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="date_of_installation" value={room.date_of_installation || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                      <TableCell><TextField fullWidth name="date_of_last_check" value={room.date_of_last_check || ""} onChange={(e) => handleLocalChange(e, room.id)} /></TableCell>
                    </>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSaveMassEdit}>Save Changes</Button>
            <Button variant="outlined" onClick={() => setMassEditStep(1)}>Back</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MassEditForm;