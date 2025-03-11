import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControlLabel, Checkbox, FormGroup, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columnNameMapping = {
    region: 'Region',
    country: 'Country',
    room_name_or_number: 'Room Name',
    zoom_room_name: 'Zoom Room Name',
    floor_number: 'Floor Number',
    room_checked: 'Room Checked',
    room_size: 'Room Size',
    room_furniture_layout: 'Room Furniture Layout',
    number_of_primary_displays: 'Number of Primary Displays',
    primary_display_brand: 'Primary Display Brand',
    primary_display_model: 'Primary Display Model',
    display_size: 'Display Size',
    zoom_room: 'Zoom Room',
    zoom_hardware_brand: 'Zoom Hardware Brand',
    zoom_hardware_model: 'Zoom Hardware Model',
    camera_wall_or_tv_mounted: 'Camera Wall or TV Mounted',
    integrated_room: 'Integrated Room',
    control_processor_details: 'Control Processor Details',
    audio_processor_dsp_details: 'Audio Processor DSP Details',
    video_system_details: 'Video System Details',
    av_network_switch_brand: 'AV Network Switch Brand',
    av_network_switch_model: 'AV Network Switch Model',
    ceiling_mic_brand_model: 'Ceiling Mic Brand Model',
    qty_of_ceiling_mics: 'Quantity of Ceiling Mics',
    wireless_mic_brand_model: 'Wireless Mic Brand Model',
    qty_of_wireless_mics: 'Quantity of Wireless Mics',
    ceiling_speakers_brand_model: 'Ceiling Speakers Brand Model',
    qty_of_ceiling_speakers: 'Quantity of Ceiling Speakers',
    date_of_installation: 'Date of Installation',
    date_of_last_check: 'Date of Last Check',
    comments_and_additional_details: 'Comments and Additional Details'
};

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        add: true,
        update: true,
        delete: true,
        import: true,
        export: true,
    });

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logs`, { responseType: 'text' });
            console.log('Raw log data:', response.data); // Debug log
            const logEntries = response.data.split('\n').map(log => {
                try {
                    const logEntry = log.trim();
                    if (logEntry) {
                        return JSON.parse(logEntry);
                    }
                    return null;
                } catch (e) {
                    console.error('Error parsing log entry:', log, e); // Debug log
                    return null;
                }
            }).filter(log => log !== null);
            console.log('Parsed log entries:', logEntries); // Debug log
            setLogs(logEntries);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked });
    };

    const filteredLogs = logs.filter(log => {
        const lowerLog = JSON.stringify(log).toLowerCase();
        const matchesSearch = lowerLog.includes(searchTerm.toLowerCase());
        const matchesFilter = (filters.add && log.type.includes('ADD')) ||
                              (filters.update && log.type.includes('UPDATE')) ||
                              (filters.delete && log.type.includes('DELETE')) ||
                              (filters.import && log.type.includes('IMPORT')) ||
                              (filters.export && log.type.includes('EXPORT'));
        return matchesSearch && matchesFilter;
    });

    console.log('Filtered logs:', filteredLogs); // Debug log

    const renderDetails = (description) => {
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{description}</Typography>
                </AccordionDetails>
            </Accordion>
        );
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Logs
            </Typography>
            <TextField
                fullWidth
                label="Search logs"
                value={searchTerm}
                onChange={handleSearch}
                variant="outlined"
                margin="normal"
            />
            <FormGroup row>
                <FormControlLabel
                    control={<Checkbox checked={filters.add} onChange={handleFilterChange} name="add" />}
                    label="Add"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.update} onChange={handleFilterChange} name="update" />}
                    label="Update"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.delete} onChange={handleFilterChange} name="delete" />}
                    label="Delete"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.import} onChange={handleFilterChange} name="import" />}
                    label="Import"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.export} onChange={handleFilterChange} name="export" />}
                    label="Export"
                />
            </FormGroup>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredLogs.map((log, index) => (
                            <TableRow key={index}>
                                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{log.type.toUpperCase()}</TableCell>
                                <TableCell>{renderDetails(log.description)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default LogsPage;