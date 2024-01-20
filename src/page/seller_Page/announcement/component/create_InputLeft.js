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


const CreateInputLeft = ({onInputData}) => {
    const [initialState, setInitialState] = useState({ img: [] , title:'', info:''});
    const [images, setImages] = useState([]);
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE_IN_MB = 10;
    const MAX_IMAGES_COUNT = 4;
    useEffect(() => {
        onInputData(initialState);
    }, [initialState, onInputData]);
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
                    setInitialState((prevInitialState) => {
                        return {
                            ...initialState,
                            img: [
                                ...prevInitialState.img,
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
        setInitialState((prevInitialState) => {
            return {
                img: prevInitialState.img.filter((_, i) => i !== index),
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
                    setInitialState((prevInitialState) => {
                        return {
                            ...prevInitialState,
                            img: [
                                ...prevInitialState.img,
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
                       onChange={(e) => setInitialState({ ...initialState, title: e.target.value })}/>
            </div>
            <div className="input">
                <label htmlFor="name">Описание*</label>
                <TextArea
                    value={initialState.info}
                     onChange={(e) => setInitialState({ ...initialState, info: e.target.value })}
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
                       onChange={(e) => setInitialState({ ...initialState, price: e.target.value })}/>
            </div>
            <div className="input">
                <div className="card">
                    <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                        {isDragging ? (
                            <span className="select" style={{ color: '#70d8bd' }}>
                                drop images here
                            </span>
                        ) : (
                            <>
                                drag & drop image here or
                                <span className="select browse-btn" role={"button"} onClick={selectFiles}>
                                    Browse
                                </span>
                            </>
                        )}

                        <input type="file" name={"file"} className={"file"} multiple ref={fileInputRef} onChange={onFileSelect}></input>
                    </div>
                    <div className="container-inputLeft">
                        {mediaQuery ? (
                            <>
                                <Splide aria-label="My Favorite Images" options={{
                                    perPage: 1,
                                    type: 'loop',
                                    width: "100%",
                                    rewind: false,
                                }}>
                                    {initialState.img.map((image, index) => (
                                        <SplideSlide key={index} style={{ position: "relative" }}>
                                            <span className="delete" onClick={() => deleteImage(index)}><DeleteOutlined /></span>
                                            <img src={image.img_url} alt={image.img} />
                                        </SplideSlide>
                                    ))}
                                </Splide>
                            </>
                        ) : (
                            images.map((image, index) => (
                                <div className="image" key={index}>
                                    <span className="delete" onClick={() => deleteImage(index)}><DeleteOutlined /></span>
                                    <img src={image.url} alt={image.name} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CreateInputLeft);
