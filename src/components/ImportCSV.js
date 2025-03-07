import React, { forwardRef } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const ImportCSV = forwardRef(({ setRooms, setExistingRooms, setUpdateExisting, updateExisting }, ref) => {
  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const columnMapping = {
          "Region": "region",
          "Country": "country",
          "Room Name": "room_name_or_number",
          "Zoom Room Name": "zoom_room_name",
          "Floor": "floor_number",
          "Room Checked": "room_checked",
          "Room Size": "room_size",
          "Furniture Layout": "room_furniture_layout",
          "Primary Display Model": "primary_display_model",
          "Display Size": "display_size",
          "Zoom Room": "zoom_room",
          "Zoom Hardware Brand": "zoom_hardware_brand",
          "Zoom Hardware Model": "zoom_hardware_model",
          "Camera Mounting": "camera_wall_or_tv_mounted",
          "Integrated Room": "integrated_room",
          "Control Processor Details": "control_processor_details",
          "Audio Processor Details": "audio_processor_dsp_details",
          "Video System Details": "video_system_details",
          "AV Switch Brand": "av_network_switch_brand",
          "AV Switch Model": "av_network_switch_model",
          "Ceiling Mic Brand Model": "ceiling_mic_brand_model",
          "Qty Ceiling Mics": "qty_of_ceiling_mics",
          "Wireless Mic Brand Model": "wireless_mic_brand_model",
          "Qty Wireless Mics": "qty_of_wireless_mics",
          "Ceiling Speaker Brand Model": "ceiling_speakers_brand_model",
          "Qty Ceiling Speakers": "qty_of_ceiling_speakers",
          "Date of Installation": "date_of_installation",
          "Date of Last Check": "date_of_last_check",
          "Comments": "comments_and_additional_details"
        };

        const mappedData = result.data.map(row => {
          let mappedRow = {};
          for (const key in row) {
            if (columnMapping[key]) {
              mappedRow[columnMapping[key]] = row[key] || null;
            }
          }
          return mappedRow;
        });

        axios.post("http://localhost:5000/api/check-existing-rooms", { rooms: mappedData })
          .then((response) => {
            if (response.data.existingRooms.length > 0) {
              setExistingRooms(response.data.existingRooms);
              const confirmUpdate = window.confirm("Some rooms already exist. Do you want to update them?");
              if (!confirmUpdate) return;
              setUpdateExisting(true);
            }
            return axios.post("http://localhost:5000/api/import-rooms", { rooms: mappedData, updateExisting });
          })
          .then(() => {
            alert("CSV successfully imported.");
            return axios.get("http://localhost:5000/api/rooms");
          })
          .then((response) => setRooms(response.data))
          .catch((error) => {
            console.error("Error importing CSV:", error);
            alert("An error occurred while importing the CSV.");
          })
          .finally(() => {
            event.target.value = "";  // Clears the file input so user can re-upload the same file
          });
      },
    });
  };

  return (
    <input ref={ref} type="file" accept=".csv" onChange={handleImportCSV} style={{ display: 'none' }} />
  );
});

export default ImportCSV;