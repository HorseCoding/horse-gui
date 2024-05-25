import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import appTarget from '../app-target';
import { getInitialDarkMode } from '../../lib/tw-theme-hoc.jsx';
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
        <div className="dev-settings">
            <header className="app-bar">
                <div className="toolbar">
                    <h1 className="title">Espresso Development Settings</h1>
                    <button className="note-button" onClick={onClickNote}>Please note</button>
                </div>
            </header>

            <main className="content">
                {settingsConfig.map(setting => (
                    <div className="option" key={setting.key}>
                        <h2 className="option-label">{setting.label}</h2>
                        <label className="switch">
                            <input
                                type="checkbox"
                                onChange={() => handleChange(setting.key, setting.storageKey)}
                                checked={settings[setting.key] || false}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                ))}
            </main>
        </div>
    );
};

document.body.setAttribute('theme', getInitialDarkMode() ? 'dark' : 'light');

ReactDOM.render(<DevSettings />, appTarget);

