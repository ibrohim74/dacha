import React, {useEffect, useRef, useState,memo} from 'react';
import {Button, Input, message, Upload} from "antd";
import "../assets/create_ann.css"
import {upload} from "@testing-library/user-event/dist/upload";
import {DeleteOutlined} from "@ant-design/icons";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import useMediaQuery from '@mui/material/useMediaQuery';
import '@splidejs/react-splide/css';
import TextArea from "antd/es/input/TextArea";
import Header_adminPage from "../../../../components/header_adminPage";


const DragDrop = (props) => {
    const {inputLeft, setInputLeft} = props;
    const [images, setImages] = useState([]);
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE_IN_MB = 10;
    const MAX_IMAGES_COUNT = 4;

    const selectFiles = () => {
        fileInputRef.current.click();
    };

    const getFileSizeInBase64 = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target.result.split(',')[1];
                const fileSizeInBytes = (base64String.length * 3) / 4 - (base64String.indexOf('=') > 0 ? base64String.length - base64String.indexOf('=') : 0);
                const fileSizeInKB = fileSizeInBytes / 1024;
                const fileSizeInMB = fileSizeInKB / 1024;

                resolve(fileSizeInMB);
            };

            reader.readAsDataURL(file);
        });
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

            const fileSizeInMB = await getFileSizeInBase64(files[i]);

            if (fileSizeInMB <= MAX_FILE_SIZE_IN_MB) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    setInputLeft((previnputLeft) => {
                        return {
                            ...inputLeft,
                            img: [
                                ...previnputLeft.img,
                                {
                                    img: files[i].name,
                                    img_url: event.target.result,
                                },
                            ],
                        };
                    });

                    setImages((prevImages) => [
                        ...prevImages,
                        {
                            name: files[i].name,
                            url: event.target.result,
                        },
                    ]);
                };

                reader.readAsDataURL(files[i]);
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }
        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };

    const deleteImage = (index) => {
        setInputLeft((previnputLeft) => {
            return {
                img: previnputLeft.img.filter((_, i) => i !== index),
            };
        });

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

            const fileSizeInMB = await getFileSizeInBase64(files[i]);

            if (fileSizeInMB <= MAX_FILE_SIZE_IN_MB) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    setInputLeft((previnputLeft) => {
                        return {
                            ...previnputLeft,
                            img: [
                                ...previnputLeft.img,
                                {
                                    img: files[i].name,
                                    img_url: event.target.result,
                                },
                            ],
                        };
                    });

                    setImages((prevImages) => [
                        ...prevImages,
                        {
                            name: files[i].name,
                            url: event.target.result,
                        },
                    ]);
                };

                reader.readAsDataURL(files[i]);
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }
        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };


    return (
        <div className="calendar-input">
            <Header_adminPage title="Create" subtitle="Create announcement"/>
            <div className="input">
                <label htmlFor="name">Укажите название*</label>
                <Input placeholder={"example: dacha , basen , zimniy basen"} size={"large"}
                       onChange={(e) => setInputLeft({ ...inputLeft, title: e.target.value })}/>
            </div>
            <div className="input">
                <label htmlFor="name">Описание*</label>
                <TextArea
                    value={inputLeft?.info}
                    onChange={(e) => setInputLeft({ ...inputLeft, info: e.target.value })}
                    placeholder="Подумайте, какие подробности вы хотели бы узнать из объявления. И добавьте их в описание"
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                />
            </div>
            <div className="input">
                <label htmlFor="price">цена*</label>
                <Input placeholder={""} size={"large"}
                       onChange={(e) => setInputLeft({ ...inputLeft, price: e.target.value })}/>
            </div>
            <div className="input">

            </div>
        </div>
    );
};

export default memo(DragDrop);
