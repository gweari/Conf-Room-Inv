import React from 'react';
import { Grid, TextField, Button, Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const AddRoomForm = ({ newRoom, setNewRoom, handleAddRoom, setShowAddForm }) => {
  const handleCancel = () => {
    setNewRoom({
      region: "",
      country: "",
      room_name_or_number: "",
      zoom_room_name: "",
      floor_number: "",
      room_checked: false,
      room_size: "",
      room_furniture_layout: "",
      number_of_primary_displays: "",
      primary_display_brand: "",
      primary_display_model: "",
      display_size: "",
      zoom_room: false,
      zoom_hardware_brand: "",
      zoom_hardware_model: "",
      camera_wall_or_tv_mounted: "",
      integrated_room: false,
      control_processor_details: "",
      audio_processor_dsp_details: "",
      video_system_details: "",
      av_network_switch_brand: "",
      av_network_switch_model: "",
      ceiling_mic_brand_model: "",
      qty_of_ceiling_mics: "",
      wireless_mic_brand_model: "",
      qty_of_wireless_mics: "",
      ceiling_speakers_brand_model: "",
      qty_of_ceiling_speakers: "",
      date_of_installation: "",
      date_of_last_check: "",
      comments_and_additional_details: ""
    });
    setShowAddForm(false);
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
      <h2>Add New Room</h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={newRoom.integrated_room}
                onChange={(e) => setNewRoom({ ...newRoom, integrated_room: e.target.checked })}
              />
            }
            label="Integrated Room"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={newRoom.room_checked}
                onChange={(e) => setNewRoom({ ...newRoom, room_checked: e.target.checked })}
              />
            }
            label="Room Checked"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={newRoom.zoom_room}
                onChange={(e) => setNewRoom({ ...newRoom, zoom_room: e.target.checked })}
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
            value={newRoom.region}
            onChange={(e) => setNewRoom({ ...newRoom, region: e.target.value })}
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
            value={newRoom.country}
            onChange={(e) => setNewRoom({ ...newRoom, country: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Room Name"
            value={newRoom.room_name_or_number}
            onChange={(e) => setNewRoom({ ...newRoom, room_name_or_number: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Floor"
            value={newRoom.floor_number}
            onChange={(e) => setNewRoom({ ...newRoom, floor_number: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Primary Display Model"
            value={newRoom.primary_display_model}
            onChange={(e) => setNewRoom({ ...newRoom, primary_display_model: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Display Size"
            value={newRoom.display_size}
            onChange={(e) => setNewRoom({ ...newRoom, display_size: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Room Size"
            value={newRoom.room_size}
            onChange={(e) => setNewRoom({ ...newRoom, room_size: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Furniture Layout"
            value={newRoom.room_furniture_layout}
            onChange={(e) => setNewRoom({ ...newRoom, room_furniture_layout: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Comments and Additional Details"
            value={newRoom.comments_and_additional_details}
            onChange={(e) => setNewRoom({ ...newRoom, comments_and_additional_details: e.target.value })}
          />
        </Grid>
        {newRoom.zoom_room && (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Zoom Room Name"
                value={newRoom.zoom_room_name || ""}
                onChange={(e) => setNewRoom({ ...newRoom, zoom_room_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Zoom Hardware Brand"
                value={newRoom.zoom_hardware_brand || ""}
                onChange={(e) => setNewRoom({ ...newRoom, zoom_hardware_brand: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Zoom Hardware Model"
                value={newRoom.zoom_hardware_model || ""}
                onChange={(e) => setNewRoom({ ...newRoom, zoom_hardware_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Camera Mounting"
                select
                value={newRoom.camera_wall_or_tv_mounted || ""}
                onChange={(e) => setNewRoom({ ...newRoom, camera_wall_or_tv_mounted: e.target.value })}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Wall Mounted">Wall Mounted</MenuItem>
                <MenuItem value="TV Mounted">TV Mounted</MenuItem>
              </TextField>
            </Grid>
          </>
        )}
        {newRoom.integrated_room && (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Control Processor Details"
                value={newRoom.control_processor_details || ""}
                onChange={(e) => setNewRoom({ ...newRoom, control_processor_details: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Audio Processor DSP Details"
                value={newRoom.audio_processor_dsp_details || ""}
                onChange={(e) => setNewRoom({ ...newRoom, audio_processor_dsp_details: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Video System Details"
                value={newRoom.video_system_details || ""}
                onChange={(e) => setNewRoom({ ...newRoom, video_system_details: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="AV Network Switch Brand"
                value={newRoom.av_network_switch_brand || ""}
                onChange={(e) => setNewRoom({ ...newRoom, av_network_switch_brand: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="AV Network Switch Model"
                value={newRoom.av_network_switch_model || ""}
                onChange={(e) => setNewRoom({ ...newRoom, av_network_switch_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Ceiling Mic Brand Model"
                value={newRoom.ceiling_mic_brand_model || ""}
                onChange={(e) => setNewRoom({ ...newRoom, ceiling_mic_brand_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Qty of Ceiling Mics"
                value={newRoom.qty_of_ceiling_mics || ""}
                onChange={(e) => setNewRoom({ ...newRoom, qty_of_ceiling_mics: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Wireless Mic Brand Model"
                value={newRoom.wireless_mic_brand_model || ""}
                onChange={(e) => setNewRoom({ ...newRoom, wireless_mic_brand_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Qty of Wireless Mics"
                value={newRoom.qty_of_wireless_mics || ""}
                onChange={(e) => setNewRoom({ ...newRoom, qty_of_wireless_mics: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Ceiling Speakers Brand Model"
                value={newRoom.ceiling_speakers_brand_model || ""}
                onChange={(e) => setNewRoom({ ...newRoom, ceiling_speakers_brand_model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Qty of Ceiling Speakers"
                value={newRoom.qty_of_ceiling_speakers || ""}
                onChange={(e) => setNewRoom({ ...newRoom, qty_of_ceiling_speakers: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Date of Last Check"
                value={newRoom.date_of_last_check || ""}
                onChange={(e) => setNewRoom({ ...newRoom, date_of_last_check: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Date of Installation"
                value={newRoom.date_of_installation || ""}
                onChange={(e) => setNewRoom({ ...newRoom, date_of_installation: e.target.value })}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={handleAddRoom} style={{ marginRight: "10px" }}>
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

export default AddRoomForm;