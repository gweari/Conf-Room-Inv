import React, { forwardRef } from 'react';

const ExportCSV = forwardRef(({ rooms }, ref) => {
  const handleExportCSV = () => {
    if (rooms.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "Region", "Country", "Room Name", "Zoom Room Name", "Floor", 
      "Room Checked", "Room Size", "Furniture Layout", "Primary Displays",
      "Primary Display Brand", "Primary Display Model", "Display Size",
      "Zoom Room", "Zoom Hardware Brand", "Zoom Hardware Model", 
      "Camera Mounting", "Integrated Room", "Control Processor Details",
      "Audio Processor Details", "Video System Details", 
      "AV Network Switch Brand", "AV Network Switch Model", 
      "Ceiling Mic Brand Model", "Qty Ceiling Mics", 
      "Wireless Mic Brand Model", "Qty Wireless Mics", 
      "Ceiling Speaker Brand Model", "Qty Ceiling Speakers", 
      "Date of Installation", "Date of Last Check", "Comments"
    ];

    const csvRows = [
      headers.join(","), // Add headers first
      ...rooms.map(room =>
        [
          room.region, room.country, room.room_name_or_number, 
          room.zoom_room_name, room.floor_number, room.room_checked, 
          room.room_size, room.room_furniture_layout, room.number_of_primary_displays, 
          room.primary_display_brand, room.primary_display_model, 
          room.display_size, room.zoom_room, room.zoom_hardware_brand, 
          room.zoom_hardware_model, room.camera_wall_or_tv_mounted, 
          room.integrated_room, room.control_processor_details, 
          room.audio_processor_dsp_details, room.video_system_details, 
          room.av_network_switch_brand, room.av_network_switch_model, 
          room.ceiling_mic_brand_model, room.qty_of_ceiling_mics, 
          room.wireless_mic_brand_model, room.qty_of_wireless_mics, 
          room.ceiling_speakers_brand_model, room.qty_of_ceiling_speakers, 
          room.date_of_installation, room.date_of_last_check, 
          `"${room.comments_and_additional_details}"`
        ].join(",") // Join row values with commas
      )
    ].join("\n");

    const blob = new Blob([csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Conference_Room_Inventory.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button ref={ref} onClick={handleExportCSV} style={{ display: 'none' }}>
      Export CSV
    </button>
  );
});

export default ExportCSV;