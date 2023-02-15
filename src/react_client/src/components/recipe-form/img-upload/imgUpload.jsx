import React, {useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import"./imgUpload.scss";
import {MdFileUpload} from "react-icons/md";

const ImgUpload = ({editMode, image,setImage}) => {
    useEffect(() => {
    }, [image]);

    const uploadImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = function (e) {
            const dataUrl = e.target.result;
            setImage(dataUrl);
        };
        reader.readAsDataURL(file);
    }

    const deleteImage = () => {
        setImage(null);
    }

    if (editMode) {
        return (
            <div className="img-container">
                {!image ? (
                    <div className="img-upload">
                        <label className="upload-btn">
                            <MdFileUpload className="upload-icon" size="60px"></MdFileUpload>
                            <p className="">
                                Upload image
                            </p>
                            <input
                                type="file"
                                id="upload"
                                accept="image/*"
                                onChange={uploadImage}
                                className="upload-input"
                            />
                        </label>
                    </div>
                ) : (
                    <div className="img-preview">
                        <div className="img-box">
                            <img
                                src={image}
                                alt=''
                                className="img-item"
                            />

                        </div>
                        <button
                            type="button"
                            className="delete-img-btn"
                            onClick={deleteImage}
                        >
                            <DeleteIcon className="text-white" />
                        </button>
                    </div>
                )}
            </div>
        )
    } else {
        return (
                image && (
                <div className="img-container">
                    <div className="img-preview">
                        <div className="img-box">
                            <img
                                src={image}
                                alt=''
                                className="img-item"
                            />

                        </div>
                    </div>
                </div>
                )
        )
    }

}

export default ImgUpload;