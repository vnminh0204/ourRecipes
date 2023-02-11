import React, {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import"./imgUpload.scss";
import {MdFileUpload} from "react-icons/md";

const ImgUpload = () => {
    const [image,setImage] = useState(null);
    const uploadImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = function (e) {
            const dataUrl = e.target.result;
            console.log(dataUrl);
            setImage(dataUrl)
        };
        reader.readAsDataURL(file);
    }

    const deleteImage = () => {
        setImage(null)
    }


    return (
        <div className="img-container">

                {!image ? (
                    <div className="img-upload">
                        <label className="upload-btn">
                            <MdFileUpload className="upload-icon" size="60px"></MdFileUpload>
                            <p className="">
                                Upload image (1MB)
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
    // absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out
    )
}

export default ImgUpload;