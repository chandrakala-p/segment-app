import React, { useState } from 'react';
import axios from 'axios';
import './Popup.css';

const Popup = ({ handleClose }) => {
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchema, setSelectedSchema] = useState('');
    const [customSchemas, setCustomSchemas] = useState([]);
    const [availableSchemas, setAvailableSchemas] = useState([
        'first_name',
        'last_name',
        'gender',
        'age',
        'account_name',
        'city',
        'state',
    ]);

    const handleChangeSegmentName = (event) => {
        setSegmentName(event.target.value);
    };

    const handleChangeSchema = (event, index) => {
        const updatedSchemas = [...customSchemas];
        updatedSchemas[index] = event.target.value;
        setCustomSchemas(updatedSchemas);
    };

    const handleAddCustomSchema = () => {
        if (selectedSchema !== '') {
            setCustomSchemas([...customSchemas, selectedSchema]);
            setSelectedSchema('');
        }
    };

    const handleSave = async () => {
        const segmentData = {
            segment_name: segmentName,
            schema: [...customSchemas.map((schema) => ({ [schema]: schema.charAt(0).toUpperCase() + schema.slice(1) }))],
        };

        try {
            await axios.post("https://webhook.site/4813b714-3ecd-4843-860f-c3508e62cb2d", segmentData);
            console.log('Segment data sent to the server:', segmentData);
            handleClose();
        } catch (error) {
            console.error('Error sending segment data:', error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Popup Title</h2>
                <form>
                    <input type="text" placeholder="Enter segment name" value={segmentName} onChange={handleChangeSegmentName} />
                    <div className="schema-container">
                        {customSchemas.map((schema, index) => (
                            <select key={index} value={schema} onChange={(e) => handleChangeSchema(e, index)}>
                                <option value="">Select a schema</option>
                                {availableSchemas.map((option) => (
                                    <option key={option} value={option} disabled={customSchemas.includes(option)}>
                                        Label: {option.charAt(0).toUpperCase() + option.slice(1)} Value: {option}
                                    </option>
                                ))}
                            </select>
                        ))}
                    </div>
                    <select value={selectedSchema} onChange={(e) => setSelectedSchema(e.target.value)}>
                        <option value="">Add schema to segment</option>
                        {availableSchemas.map((schema) => (
                            <option key={schema} value={schema}>
                                Label: {schema.charAt(0).toUpperCase() + schema.slice(1)} Value: {schema}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAddCustomSchema}>
                        + Add new schema
                    </button>

                    <button type="button" className="save-btn" onClick={handleSave}>
                        Save
                    </button>
                </form>
                <button className="close-btn" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
