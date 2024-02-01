import React, {useRef, useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {message} from 'antd';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import {$authHost} from "../../../../processes/http/http";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'

const AnnItemAddPhoto = (id) => {
    const [inputLeft, setInputLeft] = useState({img: []});
    const [images, setImages] = useState([]);
    const [loadingFile, setLoadingFile] = useState(false)
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE_IN_MB = 10;
    const MAX_IMAGES_COUNT = 4;
    const dachaId = id; // Replace with your actual dacha ID

    const getFileSizeInMB = (file) => {
        return file.size / (1024 * 1024);
    };
    const uploadPhotoToServer = async (file) => {
        setLoadingFile(true)
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await $authHost.post(`/dacha/${id.dachaId}/upload_photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoadingFile(false)
            // Handle the server response as needed
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error uploading photo to server:', error);
            // Handle the error
            message.error('Error uploading photo to server');
            setLoadingFile(false)
        }
    };

    const onFileSelect = async (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        if (images.length + files.length > MAX_IMAGES_COUNT) {
            message.error(`Siz ${MAX_IMAGES_COUNT} dan ko'p rasm yuklab bo'lmaysiz`);
            return;
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;

            const fileSizeInMB = getFileSizeInMB(files[i]);

            if (fileSizeInMB <= MAX_FILE_SIZE_IN_MB) {
                // Upload the file to the server
                await uploadPhotoToServer(files[i]);

                // Continue with local state updates
                const blob = new Blob([files[i]], {type: files[i].type});
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(blob);

                setInputLeft((prevInputLeft) => ({
                    ...prevInputLeft,
                    img: [
                        ...prevInputLeft.img,
                        {
                            img: files[i].name,
                            img_url: imageUrl,
                        },
                    ],
                }));

                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: imageUrl,
                    },
                ]);
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }
        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };

    const deleteImage = (index) => {
        setInputLeft((prevInputLeft) => ({
            img: prevInputLeft.img.filter((_, i) => i !== index),
        }));

        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = 'copy';
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length === 0) return;

        if (images.length + files.length > MAX_IMAGES_COUNT) {
            message.error(`Siz ${MAX_IMAGES_COUNT} dan ko'p rasm yuklab bo'lmaysiz`);
            return;
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;

            const fileSizeInMB = getFileSizeInMB(files[i]);

            if (fileSizeInMB <= MAX_FILE_SIZE_IN_MB) {
                // Upload the file to the server
                await uploadPhotoToServer(files[i]);

                // Continue with local state updates
                const blob = new Blob([files[i]], {type: files[i].type});
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(blob);

                setInputLeft((prevInputLeft) => ({
                    ...prevInputLeft,
                    img: [
                        ...prevInputLeft.img,
                        {
                            img: files[i].name,
                            img_url: imageUrl,
                        },
                    ],
                }));

                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: imageUrl,
                    },
                ]);
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }
        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };

    return (
        <div>
            <div className="card">
                <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                    {isDragging ? (
                        <span className="select" style={{color: '#70d8bd'}}>
                            drop images here
                        </span>
                    ) : (
                        <>
                            drag & drop image here or
                            <span className="select browse-btn" role={'button'}
                                  onClick={() => fileInputRef.current.click()}>
                                Browse
                            </span>
                        </>
                    )}

                    <input type="file" name={'file'} className={'file'} multiple ref={fileInputRef}
                           onChange={onFileSelect}></input>
                </div>
                <div className="container-inputLeft">
                    {mediaQuery ? (
                        <Splide aria-label="My Favorite Images" options={{
                            perPage: 1,
                            type: 'loop',
                            width: '100%',
                            rewind: false,
                        }}>
                            {inputLeft.img.map((image, index) => (
                                <SplideSlide key={index} style={{ position: 'relative' }}>
                                    <span className="delete" onClick={() => deleteImage(index)}>
                                        <DeleteOutlined />
                                    </span>
                                    {loadingFile && index === images.length - 1 && (
                                        <SkeletonTheme baseColor="#202020" highlightColor="#444" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                                            <p>
                                                <Skeleton count={3} />
                                            </p>
                                        </SkeletonTheme>
                                    )}
                                    <img src={image.img_url} alt={image.img} />
                                </SplideSlide>
                            ))}
                        </Splide>
                    ) : (
                        images.map((image, index) => (
                            <div className="image" key={index} style={{ position: 'relative' }}>
                                {loadingFile && index === images.length - 1 && (
                                    <SkeletonTheme baseColor="#202020" highlightColor="#444" >
                                        <p>
                                            <Skeleton count={3} />
                                        </p>
                                    </SkeletonTheme>
                                )}
                                <span className="delete" onClick={() => deleteImage(index)}>
                                    <DeleteOutlined />
                                </span>
                                <img src={image.url} alt={image.name} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnItemAddPhoto;
