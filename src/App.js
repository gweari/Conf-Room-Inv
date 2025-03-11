import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddRoomForm from './components/AddRoomForm';
import EditRoomForm from './components/EditRoomForm';
import MassEditForm from './components/MassEditForm';
import ExportCSV from './components/ExportCSV';
import ImportCSV from './components/ImportCSV';
import RoutesComponent from './components/RoutesComponent';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';

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
  const [logs, setLogs] = useState([]); // State to store logs
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showMassEditForm, setShowMassEditForm] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    region: '',
    country: '',
    room_name_or_number: '',
    zoom_room_name: '',
    floor_number: '',
    room_checked: false,
    room_size: '',
    room_furniture_layout: '',
    number_of_primary_displays: '',
    primary_display_brand: '',
    primary_display_model: '',
    display_size: '',
    zoom_room: false,
    zoom_hardware_brand: '',
    zoom_hardware_model: '',
    camera_wall_or_tv_mounted: '',
    integrated_room: false,
    control_processor_details: '',
    audio_processor_dsp_details: '',
    video_system_details: '',
    av_network_switch_brand: '',
    av_network_switch_model: '',
    ceiling_mic_brand_model: '',
    qty_of_ceiling_mics: '',
    wireless_mic_brand_model: '',
    qty_of_wireless_mics: '',
    ceiling_speakers_brand_model: '',
    qty_of_ceiling_speakers: '',
    date_of_installation: '',
    date_of_last_check: '',
    comments_and_additional_details: '',
  });
  const [editingRoom, setEditingRoom] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [massEditStep, setMassEditStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermm, setSearchTermm] = useState(''); // Mass Edit Search
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11; // Update to 15 items per page
  const [existingRooms, setExistingRooms] = useState([]);
  const [updateExisting, setUpdateExisting] = useState(false);

  const exportRef = useRef(null);
  const importRef = useRef(null);

  useEffect(() => {
    fetchRooms();
    fetchLogs(); // Fetch initial logs
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/rooms`);
      if (Array.isArray(response.data)) {
        setRooms(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logs`, { responseType: 'text' });
      const logEntries = response.data.split('\n').map(log => {
        try {
          const logEntry = log.trim();
          if (logEntry) {
            return JSON.parse(logEntry);
          }
          return null;
        } catch (e) {
          console.error('Error parsing log entry:', log, e);
          return null;
        }
      }).filter(log => log !== null);
      setLogs(logEntries);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleAddRoom = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/rooms`, newRoom);
      if (response.status === 201) {
        alert('Room added successfully!');
        fetchRooms(); // Fetch the latest data after adding a room
        setShowAddForm(false);
        setNewRoom({
          region: '',
          country: '',
          room_name_or_number: '',
          zoom_room_name: '',
          floor_number: '',
          room_checked: false,
          room_size: '',
          room_furniture_layout: '',
          number_of_primary_displays: '',
          primary_display_brand: '',
          primary_display_model: '',
          display_size: '',
          zoom_room: false,
          zoom_hardware_brand: '',
          zoom_hardware_model: '',
          camera_wall_or_tv_mounted: '',
          integrated_room: false,
          control_processor_details: '',
          audio_processor_dsp_details: '',
          video_system_details: '',
          av_network_switch_brand: '',
          av_network_switch_model: '',
          ceiling_mic_brand_model: '',
          qty_of_ceiling_mics: '',
          wireless_mic_brand_model: '',
          qty_of_wireless_mics: '',
          ceiling_speakers_brand_model: '',
          qty_of_ceiling_speakers: '',
          date_of_installation: '',
          date_of_last_check: '',
          comments_and_additional_details: '',
        });
      } else {
        alert('Failed to add room. Please try again.');
      }
    } catch (error) {
      console.error('Error adding room:', error);
      alert('An error occurred while adding the room. Please try again.');
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowEditForm(true);
  };

  const handleUpdateRoom = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/${editingRoom.id}`, editingRoom);
      if (response.status === 200) {
        alert('Room updated successfully!');
        fetchRooms(); // Fetch the latest data after updating a room
        setShowEditForm(false);
        setEditingRoom(null);
      } else {
        alert('Failed to update room. Please try again.');
      }
    } catch (error) {
      console.error('Error updating room:', error);
      alert('An error occurred while updating the room. Please try again.');
    }
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction: direction });
  };

  const resetSort = () => {
    setSortConfig({ key: null, direction: 'asc' });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/${roomId}`);
      if (response.status === 200) {
        alert('Room deleted successfully!');
        setRooms(rooms.filter((room) => room.id !== roomId));
      } else {
        alert('Failed to delete room. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('An error occurred while deleting the room. Please try again.');
    }
  };

  const handleMassEditChange = (e, roomId) => {
    const { name, value } = e.target;

    setRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === roomId ? { ...room, [name]: value } : room))
    );

    console.log(`Updated ${name} for Room ID ${roomId}:`, value);
  };

  const handleSaveMassEdit = async () => {
    if (!selectedRooms || selectedRooms.length === 0) {
        alert('No rooms selected for mass edit.');
        return;
    }

    const convertToBoolean = (value) => {
        if (typeof value === 'boolean') return value;
        if (!value) return false;
        const str = value.toString().trim().toLowerCase();
        return str === 'y' || str === 'yes' || str === 'true';
    };

    const convertToInteger = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const intValue = parseInt(value, 10);
        return isNaN(intValue) ? null : intValue;
    };

    const formattedRooms = selectedRooms
        .map((roomId) => {
            const room = rooms.find((r) => r.id === roomId);
            if (!room) return null;
            return {
                id: Number(room.id),  // Ensure ID is a number
                region: room.region || null,
                country: room.country || null,
                room_name_or_number: room.room_name_or_number || null,
                zoom_room_name: room.zoom_room_name || null,
                floor_number: convertToInteger(room.floor_number),
                room_checked: convertToBoolean(room.room_checked),
                room_size: room.room_size || null,
                room_furniture_layout: room.room_furniture_layout || null,
                number_of_primary_displays: convertToInteger(room.number_of_primary_displays),
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
                qty_of_ceiling_mics: convertToInteger(room.qty_of_ceiling_mics),
                wireless_mic_brand_model: room.wireless_mic_brand_model || null,
                qty_of_wireless_mics: convertToInteger(room.qty_of_wireless_mics),
                ceiling_speakers_brand_model: room.ceiling_speakers_brand_model || null,
                qty_of_ceiling_speakers: convertToInteger(room.qty_of_ceiling_speakers),
                date_of_installation: room.date_of_installation || null,
                date_of_last_check: room.date_of_last_check || null,
                comments_and_additional_details: room.comments_and_additional_details || null,
            };
        })
        .filter((room) => room !== null);

    console.log("Formatted Rooms Data:", formattedRooms); // Log the formatted rooms data

    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/mass-edit`, { rooms: formattedRooms });
        alert(response.data.message);
        fetchRooms(); // Fetch the latest data after mass editing rooms
        setShowMassEditForm(false);
        setSelectedRooms([]);
        setMassEditStep(1);
    } catch (error) {
        console.error('Error updating rooms:', error);
        alert('An error occurred while updating rooms.');
    }
};

  const toggleSelectRoom = (roomId) => {
    setSelectedRooms((prevSelected) =>
      prevSelected.includes(roomId) ? prevSelected.filter((id) => id !== roomId) : [...prevSelected, roomId]
    );
  };

  const handleNextStep = () => {
    if (selectedRooms.length === 0) {
      alert('Please select at least one room.');
      return;
    }
    setMassEditStep(2);
  };

  const resetMassEditForm = () => {
    setShowMassEditForm(false);
    setMassEditStep(1);
    setSelectedRooms([]);
    setSearchTermm(''); // Reset the search term for mass edit
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(room => 
    room.room_name_or_number && room.room_name_or_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const location = useLocation();

  useEffect(() => {
    // Close forms when navigating to a different page
    setShowAddForm(false);
    setShowEditForm(false);
    setShowMassEditForm(false);
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBarComponent
          toggleDrawer={toggleDrawer}
          setShowAddForm={setShowAddForm}
          setShowMassEditForm={setShowMassEditForm}
          exportRef={exportRef}
          importRef={importRef}
        />
        <DrawerComponent drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <Container style={{ marginTop: '20px' }}>
          <RoutesComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            displayedRooms={filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            handleEditRoom={handleEditRoom}
            handleDeleteRoom={handleDeleteRoom}
            handleSort={handleSort}
            sortConfig={sortConfig}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredRooms.length / itemsPerPage)}
            handlePageChange={handlePageChange}
            resetSort={resetSort}
            logs={logs}
          />
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
            filteredRoomms={rooms.filter(room => room.room_name_or_number && room.room_name_or_number.toLowerCase().includes(searchTermm.toLowerCase()))}
            handleNextStep={handleNextStep}
            resetMassEditForm={resetMassEditForm}
            toggleSelectRoom={toggleSelectRoom}
          />
        )}
        <ExportCSV rooms={rooms} ref={exportRef} style={{ display: 'none' }} />
        <ImportCSV
          setRooms={setRooms}
          setExistingRooms={setExistingRooms}
          setUpdateExisting={setUpdateExisting}
          updateExisting={updateExisting}
          ref={importRef}
          style={{ display: 'none' }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;