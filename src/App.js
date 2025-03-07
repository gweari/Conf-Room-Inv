import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Typography, Button, AppBar, Toolbar, IconButton, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddRoomForm from "./components/AddRoomForm";
import EditRoomForm from "./components/EditRoomForm";
import RoomList from "./components/RoomList";
import Pagination from "./components/Pagination";
import MassEditForm from "./components/MassEditForm";
import ExportCSV from "./components/ExportCSV";
import ImportCSV from "./components/ImportCSV";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const [rooms, setRooms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showMassEditForm, setShowMassEditForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
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
  const [editingRoom, setEditingRoom] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [massEditStep, setMassEditStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermm, setSearchTermm] = useState(""); // Mass Edit Search
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11; // Update to 15 items per page
  const [existingRooms, setExistingRooms] = useState([]);
  const [updateExisting, setUpdateExisting] = useState(false);

  const exportRef = useRef(null);
  const importRef = useRef(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleAddRoom = async () => {
    try {
        const response = await axios.post("http://localhost:5000/api/rooms", newRoom);
        if (response.status === 201) {
            alert("Room added successfully!");
            fetchRooms(); // Fetch the latest data after adding a room
            setShowAddForm(false);
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
        } else {
            alert("Failed to add room. Please try again.");
        }
    } catch (error) {
        console.error("Error adding room:", error);
        alert("An error occurred while adding the room. Please try again.");
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowEditForm(true);
  };

  const handleUpdateRoom = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/rooms/${editingRoom.id}`, editingRoom);
      if (response.status === 200) {
        alert("Room updated successfully!");
        setRooms(rooms.map(room => (room.id === editingRoom.id ? response.data : room)));
        setShowEditForm(false);
        setEditingRoom(null);
      } else {
        alert("Failed to update room. Please try again.");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("An error occurred while updating the room. Please try again.");
    }
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction: direction });
  };

  const resetSort = () => {
    setSortConfig({ key: null, direction: "asc" });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
      if (response.status === 200) {
        alert("Room deleted successfully!");
        setRooms(rooms.filter(room => room.id !== roomId));
      } else {
        alert("Failed to delete room. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("An error occurred while deleting the room. Please try again.");
    }
  };

  const handleMassEditChange = (e, roomId) => {
    const { name, value } = e.target;

    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? { ...room, [name]: value } : room
      )
    );

    console.log(`Updated ${name} for Room ID ${roomId}:`, value);
  };

  const handleSaveMassEdit = async () => {
    if (!selectedRooms || selectedRooms.length === 0) {
      alert("No rooms selected for mass edit.");
      return;
    }

    const convertToBoolean = (value) => {
      if (typeof value === "boolean") return value;
      if (!value) return false;
      const str = value.toString().trim().toLowerCase();
      return str === "y" || str === "yes" || str === "true";
    };

    const formattedRooms = selectedRooms.map(roomId => {
      const room = rooms.find(r => r.id === roomId);
      if (!room) return null;
      return {
        id: room.id,
        region: room.region || null,
        country: room.country || null,
        room_name_or_number: room.room_name_or_number || null,
        zoom_room_name: room.zoom_room_name || null,
        floor_number: room.floor_number || null,
        room_checked: convertToBoolean(room.room_checked),
        room_size: room.room_size || null,
        room_furniture_layout: room.room_furniture_layout || null,
        number_of_primary_displays: room.number_of_primary_displays || null,
        primary_display_brand: room.primary_display_brand || null,
        primary_display_model: room.primary_display_model || null,
        display_size: room.display_size || null,
        zoom_room: convertToBoolean(room.zoom_room),
        zoom_hardware_brand: room.zoom_hardware_brand || null,
        zoom_hardware_model: room.zoom_hardware_model || null,
        camera_wall_or_tv_mounted: room.camera_wall_or_tv_mounted || null,
        integrated_room: convertToBoolean(room.integrated_room),
        control_processor_details: room.control_processor_details || null,
        audio_processor_dsp_details: room.audio_processor_dsp_details || null,
        video_system_details: room.video_system_details || null,
        av_network_switch_brand: room.av_network_switch_brand || null,
        av_network_switch_model: room.av_network_switch_model || null,
        ceiling_mic_brand_model: room.ceiling_mic_brand_model || null,
        qty_of_ceiling_mics: room.qty_of_ceiling_mics || null,
        wireless_mic_brand_model: room.wireless_mic_brand_model || null,
        qty_of_wireless_mics: room.qty_of_wireless_mics || null,
        ceiling_speakers_brand_model: room.ceiling_speakers_brand_model || null,
        qty_of_ceiling_speakers: room.qty_of_ceiling_speakers || null,
        date_of_installation: room.date_of_installation || null,
        date_of_last_check: room.date_of_last_check || null,
        comments_and_additional_details: room.comments_and_additional_details || null
      };
    }).filter(room => room !== null);

    try {
      const response = await axios.put("http://localhost:5000/api/mass-edit-rooms", { rooms: formattedRooms });
      alert(response.data.message);
      setShowMassEditForm(false);
      setSelectedRooms([]);
      setMassEditStep(1);
    } catch (error) {
      console.error("Error updating rooms:", error);
      alert("An error occurred while updating rooms.");
    }
  };

  const toggleSelectRoom = (roomId) => {
    setSelectedRooms(prevSelected =>
      prevSelected.includes(roomId)
        ? prevSelected.filter(id => id !== roomId)
        : [...prevSelected, roomId]
    );
  };

  const handleNextStep = () => {
    if (selectedRooms.length === 0) {
      alert("Please select at least one room.");
      return;
    }
    setMassEditStep(2);
  };

  const resetMassEditForm = () => {
    setShowMassEditForm(false);
    setMassEditStep(1);
    setSelectedRooms([]);
  };

  const filteredRooms = rooms.filter((room) => {
    return (
        (room.region && room.region.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.country && room.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.room_name_or_number && room.room_name_or_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.zoom_room_name && room.zoom_room_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.floor_number && room.floor_number.toString().includes(searchTerm))
    );
});

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";
    return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });

  const totalPages = Math.ceil(sortedRooms.length / itemsPerPage);
  const displayedRooms = sortedRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Conference Room Inventory
          </Typography>
          <Button color="inherit" onClick={() => setShowAddForm(true)}>Add Room</Button>
          <Button color="inherit" onClick={() => setShowMassEditForm(true)}>Mass Edit</Button>
          <Button color="inherit" onClick={() => exportRef.current.click()}>Export CSV</Button>
          <Button color="inherit" onClick={() => importRef.current.click()}>Import CSV</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search Rooms"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              margin="normal"
              InputProps={{ style: { padding: '0 8px', fontSize: '0.875rem', height: '32px', lineHeight: '32px' } }} // Adjusted padding, font size, height, and line height
              InputLabelProps={{ style: { fontSize: '0.875rem' }, shrink: true }} // Adjusted label position and shrink property
            />
          </Grid>
          <Grid item xs={12}>
            <RoomList rooms={displayedRooms} handleEditRoom={handleEditRoom} handleDeleteRoom={handleDeleteRoom} handleSort={handleSort} sortConfig={sortConfig} />
          </Grid>
          <Grid item xs={12}>
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button variant="outlined" onClick={resetSort}>Reset Sort</Button>
          </Grid>
        </Grid>
      </Container>
      {showAddForm && (
        <AddRoomForm
          newRoom={newRoom}
          setNewRoom={setNewRoom}
          handleAddRoom={handleAddRoom}
          setShowAddForm={setShowAddForm}
        />
      )}
      {showEditForm && (
        <EditRoomForm
          editingRoom={editingRoom}
          setEditingRoom={setEditingRoom}
          handleUpdateRoom={handleUpdateRoom}
          setShowEditForm={setShowEditForm}
        />
      )}
      {showMassEditForm && (
        <MassEditForm
          rooms={rooms}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          handleMassEditChange={handleMassEditChange}
          handleSaveMassEdit={handleSaveMassEdit}
          setShowMassEditForm={setShowMassEditForm}
          massEditStep={massEditStep}
          setMassEditStep={setMassEditStep}
          searchTermm={searchTermm}
          setSearchTermm={setSearchTermm}
          filteredRoomms={filteredRooms}
          handleNextStep={handleNextStep}
          resetMassEditForm={resetMassEditForm}
          toggleSelectRoom={toggleSelectRoom}
        />
      )}
      <ExportCSV rooms={filteredRooms} ref={exportRef} style={{ display: 'none' }} />
      <ImportCSV setRooms={setRooms} setExistingRooms={setExistingRooms} setUpdateExisting={setUpdateExisting} updateExisting={updateExisting} ref={importRef} style={{ display: 'none' }} />
    </ThemeProvider>
  );
}

export default App;