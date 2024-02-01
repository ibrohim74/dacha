import React, {useEffect, useRef, useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {message} from 'antd';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import {$authHost} from "../../../../processes/http/http";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {DeleteDachaPhotoAPI} from "../API/announcementAPI";

const AnnItemAddPhoto = (dacha) => {
    const [inputLeft, setInputLeft] = useState({img: []});
    const [images, setImages] = useState([]);
    const [dachaImg, setDachaImg] = useState([]);
    const [loadingFile, setLoadingFile] = useState(false);
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE_IN_MB = 3;
    const MAX_IMAGES_COUNT = 8;

    const getFileSizeInMB = (file) => {
        return file.size / (1024 * 1024);
    };

    const uploadPhotoToServer = async (file) => {
        setLoadingFile(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await $authHost.post(`/dacha/${dacha.dachaId}/upload_photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoadingFile(false);
            // Handle the server response as needed
            console.log('Server response:', response.data);
            setImages(prevState => [
                ...prevState,
                {
                    name: `img`,
                    url: "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" + response.data.file_path
                }
            ])
            // Fetch updated images from the server
            fetchImagesFromServer();
        } catch (error) {
            console.error('Error uploading photo to server:', error);
            // Handle the error
            message.error('Error uploading photo to server');
            setLoadingFile(false);
        }
    };
    const fetchImagesFromServer = async () => {
        setDachaImg(dacha.dacha.photos_path.split('\n').filter(Boolean));

        if (dachaImg.length >= 1) {
            const newImages = dachaImg.map((item, index) => ({
                name: `img${index + 1}`,
                url: "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" + item
            }));

            // Tekshirish va qo'shish
            const filteredImages = newImages.filter(image => {
                // Ma'lumotlar bazasida bunday URL li obyekt mavjud emas
                return !images.some(existingImage => existingImage.url === image.url);
            });

            setImages(prevImg => [...prevImg, ...filteredImages]);
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
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }

        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };


    const deleteImage = (image, index) => {
        const urlWithoutPrefix = image.url.replace("https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net", "");
        DeleteDachaPhotoAPI(urlWithoutPrefix).then(r => {
            if (r.status === 200) {
                setImages((prevImages) => prevImages.filter((_, i) => i !== index));
            }
        })
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
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }

        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };

    useEffect(() => {
        fetchImagesFromServer()
    }, [dachaImg.length, images.length]);
    console.log(dachaImg)
    console.log(images)
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
                            {images?.map((image, index) => (
                                <SplideSlide key={index} style={{position: 'relative', width: '200px', height: "200px"}}>
                                    <span className="delete" onClick={() => deleteImage(index)}>
                                        <DeleteOutlined/>
                                      </span>

                                    {loadingFile && index === images.length - 1 && (
                                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                            <p>
                                                <Skeleton width={'100%'} height={'100%'}/>
                                            </p>
                                        </SkeletonTheme>
                                    )}

                                    <img src={image.url} alt={image.name}/>
                                </SplideSlide>
                            ))}
                        </Splide>
                    ) : (
                        images?.map((image, index) => (
                            <div className="image" key={index}
                                 style={{position: 'relative', width: '200px', height: "200px"}}>
                                {loadingFile && index === images.length - 1 && (
                                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                        <p>
                                            <Skeleton width={'100%'} height={'100%'}/>
                                        </p>
                                    </SkeletonTheme>
                                )}
                                <div key={index}>
                  <span className="delete" onClick={() => deleteImage(image, index)}>
                    <DeleteOutlined/>
                  </span>
                                    <img src={image.url} alt={image.name} style={{objectFit: "cover"}}/>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/*{dachaImg?.map((item,index)=>{return(<img width={'100px'} src={"https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net"+item} key={index} alt=""/>)})}*/}

            </div>
        </div>
    );
};

export default AnnItemAddPhoto;
