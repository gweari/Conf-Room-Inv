import React from 'react';
import { Grid, TextField, Button, Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const EditRoomForm = ({ editingRoom, setEditingRoom, handleUpdateRoom, setShowEditForm }) => {
  const handleCancel = () => {
    setEditingRoom(null);
    setShowEditForm(false);
  };

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
      width: "80%",
      maxHeight: "80%",
      overflowY: "auto"
    }}>
      <h2>Edit Room</h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editingRoom.integrated_room}
                onChange={(e) => setEditingRoom({ ...editingRoom, integrated_room: e.target.checked })}
              />
            }
            label="Integrated Room"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editingRoom.room_checked}
                onChange={(e) => setEditingRoom({ ...editingRoom, room_checked: e.target.checked })}
              />
            }
            label="Room Checked"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editingRoom.zoom_room}
                onChange={(e) => setEditingRoom({ ...editingRoom, zoom_room: e.target.checked })}
              />
            }
            label="Zoom Room"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Region"
            select
            value={editingRoom.region}
            onChange={(e) => setEditingRoom({ ...editingRoom, region: e.target.value })}
          >
            <MenuItem value="">Select Region</MenuItem>
            <MenuItem value="AMER">AMER</MenuItem>
            <MenuItem value="JAPAC">JAPAC</MenuItem>
            <MenuItem value="EMEA">EMEA</MenuItem>
            <MenuItem value="TEST">TEST</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Country"
            value={editingRoom.country}
            onChange={(e) => setEditingRoom({ ...editingRoom, country: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Room Name"
            value={editingRoom.room_name_or_number}
            onChange={(e) => setEditingRoom({ ...editingRoom, room_name_or_number: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Floor"
            value={editingRoom.floor_number}
            onChange={(e) => setEditingRoom({ ...editingRoom, floor_number: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Primary Display Model"
            value={editingRoom.primary_display_model}
            onChange={(e) => setEditingRoom({ ...editingRoom, primary_display_model: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Display Size"
            value={editingRoom.display_size}
            onChange={(e) => setEditingRoom({ ...editingRoom, display_size: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Room Size"
            value={editingRoom.room_size}
            onChange={(e) => setEditingRoom({ ...editingRoom, room_size: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Furniture Layout"
            value={editingRoom.room_furniture_layout}
            onChange={(e) => setEditingRoom({ ...editingRoom, room_furniture_layout: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Comments and Additional Details"
            value={editingRoom.comments_and_additional_details}
            onChange={(e) => setEditingRoom({ ...editingRoom, comments_and_additional_details: e.target.value })}
          />
        </Grid>
        {editingRoom.zoom_room && (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Zoom Room Name"
                value={editingRoom.zoom_room_name || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, zoom_room_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Zoom Hardware Brand"
                value={editingRoom.zoom_hardware_brand || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, zoom_hardware_brand: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Zoom Hardware Model"
                value={editingRoom.zoom_hardware_model || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, zoom_hardware_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Camera Mounting"
                select
                value={editingRoom.camera_wall_or_tv_mounted || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, camera_wall_or_tv_mounted: e.target.value })}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Wall Mounted">Wall Mounted</MenuItem>
                <MenuItem value="TV Mounted">TV Mounted</MenuItem>
              </TextField>
            </Grid>
          </>
        )}
        {editingRoom.integrated_room && (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Control Processor Details"
                value={editingRoom.control_processor_details || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, control_processor_details: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Audio Processor DSP Details"
                value={editingRoom.audio_processor_dsp_details || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, audio_processor_dsp_details: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Video System Details"
                value={editingRoom.video_system_details || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, video_system_details: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="AV Network Switch Brand"
                value={editingRoom.av_network_switch_brand || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, av_network_switch_brand: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="AV Network Switch Model"
                value={editingRoom.av_network_switch_model || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, av_network_switch_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Ceiling Mic Brand Model"
                value={editingRoom.ceiling_mic_brand_model || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, ceiling_mic_brand_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Qty of Ceiling Mics"
                value={editingRoom.qty_of_ceiling_mics || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, qty_of_ceiling_mics: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Wireless Mic Brand Model"
                value={editingRoom.wireless_mic_brand_model || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, wireless_mic_brand_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Qty of Wireless Mics"
                value={editingRoom.qty_of_wireless_mics || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, qty_of_wireless_mics: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Ceiling Speakers Brand Model"
                value={editingRoom.ceiling_speakers_brand_model || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, ceiling_speakers_brand_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Qty of Ceiling Speakers"
                value={editingRoom.qty_of_ceiling_speakers || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, qty_of_ceiling_speakers: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Date of Last Check"
                value={editingRoom.date_of_last_check || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, date_of_last_check: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Date of Installation"
                value={editingRoom.date_of_installation || ""}
                onChange={(e) => setEditingRoom({ ...editingRoom, date_of_installation: e.target.value })}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={handleUpdateRoom} style={{ marginRight: "10px" }}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditRoomForm;