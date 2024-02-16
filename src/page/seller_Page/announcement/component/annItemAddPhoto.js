import React, {useEffect, useRef, useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Button, message} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {$authHost} from "../../../../processes/http/http";
import {DeleteDachaPhotoAPI} from "../API/announcementAPI";
import {Icons} from "../../../../assets/icons/icons";

const AnnItemAddPhoto = ({dacha, dachaId, className, styles}) => {
    const [images, setImages] = useState([]);
    const [dachaImg, setDachaImg] = useState([]);
    const [loadingFile, setLoadingFile] = useState(false);
    const [current, setCurrent] = useState(0);
    const length = dachaImg?.length;
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
            const response = await $authHost.post(`/dacha/${dachaId}/upload_photo`, formData, {
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
                    url: "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" + response.data?.file_path
                }
            ])
            if (response?.status === 200){
                message.success('Rasmlar muvaffaqiyatli yuklandi');
                window.location.reload()}
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
        setDachaImg(dacha?.photos_path.split('\n').filter(Boolean));

        if (dachaImg?.length >= 1) {
            const newImages = dachaImg.map((item, index) => ({
                name: `img${index + 1}`,
                url: "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" + item
            }));


            const filteredImages = newImages.filter(image => {

                return !images.some(existingImage => existingImage.url === image.url);
            });

            setImages(prevImg => [...prevImg, ...filteredImages]);
        }
    };
    useEffect(() => {
        fetchImagesFromServer()
    }, [dacha]);
    const onFileSelect = async (e) => {
        const files = e.target.files;
        if (files?.length === 0) return;

        if (images?.length + files?.length > MAX_IMAGES_COUNT) {
            message.error(`Siz ${MAX_IMAGES_COUNT} dan ko'p rasm yuklab bo'lmaysiz`);
            return;
        }

        for (let i = 0; i < files?.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            const fileSizeInMB = getFileSizeInMB(files[i]);
            if (fileSizeInMB <= MAX_FILE_SIZE_IN_MB) {
                await uploadPhotoToServer(files[i]);
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }
    };
    const deleteImage = (image, index) => {
        const urlWithoutPrefix = image.replace("https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net", "");
        DeleteDachaPhotoAPI(urlWithoutPrefix).then(r => {
            if (r.status === 200) {
                setImages((prevImages) => prevImages.filter((_, i) => i !== index));
                window.location.reload()
            }
        })
    };
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    // if (!Array.isArray(dachaImg) || dachaImg?.length <= 0) {
    //     return null;
    // }

    return (
        <div>
             <section className={`${styles["slider"]} ${className}`}>
                <div
                    className={`${styles["arrow-hitbox"]} ${styles["left"]}`}
                    onClick={prevSlide}
                >
                    <Icons.ChevronL className={styles["left-arrow"]}/>
                </div>
                <div
                    className={`${styles["arrow-hitbox"]} ${styles["right"]}`}
                    onClick={nextSlide}
                >
                    <Icons.ChevronR className={styles["right-arrow"]}/>
                </div>
                {dachaImg?.length > 0 ? dachaImg?.map((slide, index) => {
                    return (
                        <div
                            className={styles[index === current ? "slide active" : "slide"]}
                            key={index}

                        >


                            <input type="file"
                                   name="file-input"
                                   id="file-input"
                                   onChange={onFileSelect}
                                   className={styles['custom-file-input']}

                            ></input>


                            {index === current && (
                                <>
                                    <img
                                        src={'https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net' + slide}
                                        alt="travel image"
                                        className={styles["image"]}
                                    />
                                    <Button className="delete"
                                            danger
                                            ghost
                                            style={{position:"absolute" , right:'20%'}}
                                            onClick={() => deleteImage(slide, index)}>
                                        Delete<DeleteOutlined/>
                                    </Button>
                                </>


                            )}
                        </div>
                    );
                }): <div className={styles["slide active"]}>
                    <input type="file"
                           name="file-input"
                           id="file-input"
                           onChange={onFileSelect}
                           className={styles['custom-file-input']}
                           style={{top:"50%" , left:"38%"}}
                    ></input>
                        <>
                            <img
                                src={'https://r.tourboxtech.com/file/202309/what-is-neutral-gray.jpg'}
                                alt="travel image"
                                className={styles["image"]}
                            />
                        </>

                        </div>}
            </section>
        </div>
    );
};

export default AnnItemAddPhoto;
