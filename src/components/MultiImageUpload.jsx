import React, { useRef, useState, useEffect } from "react";
import { v4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { imageDB } from "../Snippet/firebase/firebase";
import { GrCloudUpload } from "react-icons/gr";
import '../styles/MultiImageUpload.scss'
export const MultiImageUpload = ({
    formData,
    setFormData,
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(""); // State for the selected image URL
    const [isUploading, setIsUploading] = useState(false); // State for tracking upload process
    const popupRef = useRef(null);
    const handleImageChange = (e) => {
        setIsUploading(true); // Start the upload process
        const updatedUploadDocuments = []; // Clear previous attachments before new upload
        Promise.all(
            Array.from(e.target.files).map((file) => {
                const imageRef = ref(imageDB, `Documents/${v4()}`);
                return uploadBytes(imageRef, file)
                    .then(() => {
                        return getDownloadURL(imageRef)?.then((url) => {
                            updatedUploadDocuments.push({
                                name: file.name,
                                url: url,
                            });
                        });
                    })
                    .catch((error) => {
                        throw error;
                    });
            })
        )
            .then(() => {
                setFormData({
                    ...formData,
                    attachment: updatedUploadDocuments, // Always keeping only the latest image
                });
                
                setIsUploading(false); // Stop the upload process
            })
            .catch((error) => {
                console.error("Error uploading images:", error);
                setIsUploading(false); // Stop the upload process in case of error
            });
    };


    const showimagepopup = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowPopup(true); // Show the popup
    };

    const handleDeleteImage = (imageUrl) => {
        const updatedUploadDocuments = formData?.attachment.filter(
            (image) => image !== imageUrl
        );
        setFormData({
            ...formData,
            attachment: updatedUploadDocuments,
        });
    };

    return (
        <>
            <div className="form-group">
                {/* <label>Attachment</label> */}
                <div className="file-upload">
                    <input
                        type="file"
                        name='attachment'
                        id="file"
                        onChange={handleImageChange}
                    />
                    <label className="file-label fileUplodBox">
                        <label htmlFor="file" className="custom-file-upload">
                            {/* Agar attachment nahi hai toh icon dikhaye */}
                            {!formData?.attachment?.length && !isUploading && <GrCloudUpload size={20} />}
                            {/* Agar upload ho rha hai toh "Uploading..." dikhaye */}
                            {isUploading && <span>Uploading...</span>}
                            {/* Agar attachment hai toh uska naam dikhaye */}
                            {!isUploading && <span>{formData?.attachment?.length > 0 ? formData.attachment.map(image => image.name).join(', ') : 'Attachment'}</span>}
                        </label>
                        <>
                            {formData?.attachment?.map((image, index) => (
                                <span className="Show_delete_img_new_vendor" key={index}>
                                    <span
                                        className="showImg"
                                        onClick={() => showimagepopup(image.url)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#9b9b9b" fill="none">
                                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                        {/* Show */}
                                    </span>
                                    {/* <span className="deleteImg" onClick={() => handleDeleteImage(image)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#d0021b" fill="none">
                                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </span> */}
                                </span>
                            ))}
                        </>
                    </label>
                </div>

            </div>

            {showPopup && (
                <div className="imageviewlive" ref={popupRef}>
                    <div className="popup-content">
                        <span
                            className="close-button"
                            onClick={() => setShowPopup(false)}
                        >
                            <RxCross2 />
                        </span>
                        <img
                            src={selectedImage}
                            alt="Selected Image"
                        // height={500}
                        // width={500}
                        />
                    </div>
                </div>
            )}
        </>
    );
};


// 


export const MultiImageUploaders = ({ formData, setFormData, fieldName }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const popupRef = useRef(null);

    const handleImageChange = (e) => {
        setIsUploading(true);
        const updatedUploadDocuments = [];

        Promise.all(
            Array.from(e.target.files).map((file) => {
                const imageRef = ref(imageDB, `Documents/${v4()}`);
                return uploadBytes(imageRef, file)
                    .then(() => {
                        return getDownloadURL(imageRef).then((url) => {
                            updatedUploadDocuments.push({
                                name: file.name,
                                url: url,
                            });
                        });
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                    });
            })
        ).then(() => {
            // `fieldName` ke according formData update hoga
            setFormData({
                ...formData,
                [fieldName]: updatedUploadDocuments, // Multiple images store ki jaayengi
            });

            setIsUploading(false);
        }).catch((error) => {
            console.error("Error uploading images:", error);
            setIsUploading(false);
        });
    };

    const showimagepopup = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowPopup(true);
    };

    const handleDeleteImage = (imageUrl) => {
        const updatedImages = formData?.[fieldName]?.filter(
            (image) => image.url !== imageUrl
        );
        setFormData({
            ...formData,
            [fieldName]: updatedImages,
        });
    };

    return (
        <>
            <div className="form-group">
                <div className="file-upload">
                    <input
                        type="file"
                        name={fieldName}
                        id={`file-${fieldName}`}
                        onChange={handleImageChange}
                        
                        className="inputmultiple"
                    />
                    <label className="file-label fileUplodBox file-label-M">
                        <label htmlFor={`file-${fieldName}`} className="custom-file-upload">
                            {!formData?.[fieldName]?.length && !isUploading && <GrCloudUpload size={20} />}
                            {isUploading && <span>Uploading...</span>}
                            {!isUploading && <span>{formData?.[fieldName]?.length > 0 ? formData[fieldName].map(image => image.name).join(', ') : 'Attachment'}</span>}
                        </label>
                        <>
                            {formData?.[fieldName]?.map((image, index) => (
                                <span className="Show_delete_img_new_vendor" key={index}>
                                    <span className="showImg" onClick={() => showimagepopup(image.url)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#9b9b9b" fill="none">
                                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </span>
                                </span>
                            ))}
                        </>
                    </label>
                </div>
            </div>

            {showPopup && (
                <div className="imageviewlive" ref={popupRef}>
                    <div className="popup-content">
                        <span className="close-button" onClick={() => setShowPopup(false)}>
                            <RxCross2 />
                        </span>
                        <img src={selectedImage} alt="Selected Image" />
                    </div>
                </div>
            )}
        </>
    );
};
