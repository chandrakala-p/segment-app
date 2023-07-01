import React, { useState } from 'react';
import axios from 'axios';
import './Popup.css';

const Popup = ({ handleClose }) => {
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchema, setSelectedSchema] = useState('');
    const [customSchemas, setCustomSchemas] = useState([]);

    // we are using useState local storage fucntion to hold all options in a dropdown as the array of objects 
    const [availableSchemas] = useState([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]);

    //This function handles the chnage of segment Name
    const handleChangeSegmentName = (event) => {
        setSegmentName(event.target.value);
    };

    // This fucntion helps to reset the option in dropdown of the selected schemas in the segment
    const handleChangeSchema = (event, index) => {
        const updatedSchemas = [...customSchemas];
        updatedSchemas[index] = event.target.value;
        setCustomSchemas(updatedSchemas);
    };

    //This fucntion helps to add the schemas to the segment
    const handleAddCustomSchema = () => {
        if (selectedSchema !== '') {
            const selectedOption = availableSchemas.find((schema) => schema.value === selectedSchema);
            if (selectedOption) {
                setCustomSchemas([...customSchemas, selectedOption]);
                setSelectedSchema('');
            }
        }
    };

    //This function helps to send the data to the server users https://webhook.site/ website 
    // IMP-NOTE:  Enable the CORS Headers in the website to allow to send the data 
    const handleSave = async () => {
        const segmentData = {
            segment_name: segmentName,
            schema: customSchemas.map((schema) => ({ [schema.value]: schema.label })),
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
                <h2>Saving Segment</h2>
                <form>
                    <p>Enter the Name of the Segment</p>
                    <input type="text" placeholder="Enter segment name" value={segmentName} onChange={handleChangeSegmentName} />
                    <p className="description">To save your Segment, you need to add the schemas to build the query</p>
                    <div className="schema-container">
                        {customSchemas.map((schema, index) => (
                            <select key={index} value={schema.value} onChange={(e) => handleChangeSchema(e, index)}>
                                <option value="">Select a schema</option>
                                {availableSchemas.map((option) => (
                                    <option key={option.value} value={option.value} disabled={customSchemas.some((s) => s.value === option.value)}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ))}
                    </div>
                    <select value={selectedSchema} onChange={(e) => setSelectedSchema(e.target.value)}>
                        <option value="">Add schema to segment</option>
                        {availableSchemas.map((schema) => (
                            <option key={schema.value} value={schema.value}>
                                {schema.label}
                            </option>
                        ))}
                    </select>
                    <button className="add-btn" type="button" onClick={handleAddCustomSchema}>
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
