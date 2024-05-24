import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import appTarget from '../app-target';
import { getInitialDarkMode } from '../../lib/tw-theme-hoc.jsx';
import { AppBar, Box, Button, Container, Switch, Toolbar, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import './devSettings.css';

document.documentElement.lang = 'en';

const onClickNote = () => {
    Swal.fire({
        title: 'Notice',
        text: 'This page is only for developers, if you are a regular user please exit!',
        icon: 'info'
    });
};

const settingsConfig = [
    {
        key: 'disableProductionWarning',
        label: 'Disable Warning when "?production" in use',
        storageKey: 'espresso:disablePopupOnProduction',
        defaultValue: false
    },
];

const DevSettings = () => {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const initialSettings = settingsConfig.reduce((acc, setting) => {
            acc[setting.key] = localStorage.getItem(setting.storageKey) === "true";
            return acc;
        }, {});
        setSettings(initialSettings);
    }, []);

    const handleChange = (key, storageKey) => {
        const newValue = !settings[key];
        localStorage.setItem(`${storageKey}`, newValue);
        setSettings(prevSettings => ({
            ...prevSettings,
            [key]: newValue
        }));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Espresso Development Settings
                    </Typography>
                    <Button color="inherit" onClick={onClickNote}>Please note</Button>
                </Toolbar>
            </AppBar>

            <br />

            <Container maxWidth="lg">
                {settingsConfig.map(setting => (
                    <div className="option" key={setting.key}>
                        <Typography variant="h6" noWrap component="div">
                            {setting.label}
                        </Typography>
                        <Switch
                            onChange={() => handleChange(setting.key, setting.storageKey)}
                            checked={settings[setting.key] || false}
                        />
                    </div>
                ))}
            </Container>
        </Box>
    );
};

document.body.setAttribute('theme', getInitialDarkMode() ? 'dark' : 'light');

ReactDOM.render(<DevSettings />, appTarget);
