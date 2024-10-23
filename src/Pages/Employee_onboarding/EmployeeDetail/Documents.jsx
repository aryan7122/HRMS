import React, { useState, useRef } from 'react';
import { GoEye } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const Documents = ({ employeeData }) => {
    console.log('Documents❗', employeeData);

    // Parse documents and their attachments
    const parsedDocuments = employeeData.map(doc => {
        return {
            document_name: doc.document_name,
            document_id: doc.document_id,
            frontAttachments: doc.attachment_1 ? JSON.parse(doc.attachment_1) : [],
            backAttachments: doc.attachment_2 ? JSON.parse(doc.attachment_2) : [],
        };
    });

    console.log('Parsed Documents:🗑️', parsedDocuments);

    // State for popup
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [viewMode, setViewMode] = useState('front'); // Default view is front
    const popupRef = useRef();

    // Function to handle the viewing of document images
    const handleViewDocument = (frontAttachments, backAttachments) => {
        // Set front images by default
        setSelectedImages(frontAttachments.length > 0 ? frontAttachments : backAttachments);
        setShowPopup(true); // Show popup
    };

    // Function to toggle between front and back images
    const toggleView = (mode) => {
        setViewMode(mode);
        if (mode === 'front') {
            setSelectedImages(selectedImages[0] ? parsedDocuments.map(doc => doc.frontAttachments).flat() : []);
        } else {
            setSelectedImages(selectedImages[0] ? parsedDocuments.map(doc => doc.backAttachments).flat() : []);
        }
    };

    return (
        <div>
            <div className="education">
                <table>
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Document ID</th>
                            <th>View Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parsedDocuments.map((doc, index) => (
                            <tr key={index}>
                                <td>{doc.document_name || '-'}</td>
                                <td>{doc.document_id || '-'}</td>
                                <td onClick={() => handleViewDocument(doc.frontAttachments, doc.backAttachments)}>
                                    <GoEye color="#9b9b9b" size={28} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup for image view */}
            {showPopup && (
                <div className="imageviewlive" ref={popupRef}>
                    <div className="popup-content">
                        <span className="close-button" onClick={() => setShowPopup(false)}>
                            <RxCross2 />
                        </span>
                        {(selectedImages.length > 0) && (

                            <div className="toggle-buttons">
                                <button onClick={() => toggleView('front')} style={{ marginRight: '10px' }}>
                                    Front Document
                                </button>
                                <button onClick={() => toggleView('back')}>
                                    Back Document
                                </button>
                            </div>
                        )}
                        {selectedImages.length > 0 ? (
                            selectedImages.map((img, index) => (
                                <img key={index} src={img.url || 'https://via.placeholder.com/150'} alt={img.name} style={{ width: '100%', marginBottom: '10px' }} />
                            ))
                        ) : (
                            <p>No images available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
// 