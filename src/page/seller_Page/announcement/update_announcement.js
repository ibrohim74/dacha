import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import Header_adminPage from "../../../components/header_adminPage";

import {GetEvents} from "./modul/announcementCRUD";
import {Input, message, Select} from "antd";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {DeleteOutlined} from "@ant-design/icons";
import useMediaQuery from "@mui/material/useMediaQuery";
import './assets/create_ann.css'
const UpdateAnnouncement = ({id}) => {
    const [events, setEvents] = useState([])
    const [initialState, setInitialState] = useState({img: []})
    const [eventLabel, setEventLabel] = useState([])
    const [clickedEvent, setClickedEvent] = useState()
    const [images, setImages] = useState([]);
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE_IN_MB = 10;
    const MAX_IMAGES_COUNT = 4;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetEvents();
                setEvents(result);

                // "result.inputData.img" ni olish va "initialState" ga joylashtirish
                const initialImages = result.map((e) => ({
                    img: e.inputData.img.map((img) => ({
                        img_url: img.img_url,
                        img_name: img.img_name,
                    })),
                }));
                setInitialState((prevInitialState) => {
                    return {
                        ...prevInitialState,
                        img: initialImages,
                    };
                });

                const labels = result.map(event => ({
                    label: event.inputData.title,
                    value: event.inputData.title,
                    id: event.id
                }));
                setEventLabel(labels);

            } catch (error) {
                console.error("Xatolik:", error);
            }
        };

        fetchData();
    }, []);


    const onChange = (value) => {
        setClickedEvent(value)
    };
    const onSearch = (value) => {

    };

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

// Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Box m={'20px'}>
            <Header_adminPage title="Update" subtitle="Update announcement"/>
            <Select
                showSearch
                placeholder="Select a Announcement"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={eventLabel}
                style={{width: '50%'}}
            />

            {events.map((item) => {
                if (item.inputData.title === clickedEvent) {
                    return (<Box style={{padding: "10px", marginTop: "10px", background: '#1F2A40' , borderRadius:'10px'}} key={item.id}>
                       <div className="box-2-input">
                           <div className="input-2-row">
                               <label htmlFor="title">название</label>
                               <Input placeholder={""} size={"large"}
                                      value={initialState?.title ? initialState.title : item.inputData.title}
                                      onChange={(e) => setInitialState({...initialState, title: e.target.value})}/>
                           </div>
                           <div className="input-2-row">
                               <label htmlFor="price">цена</label>
                               <Input placeholder={""} size={"large"}
                                      value={initialState?.price ? initialState.price : item.inputData.price}
                                      onChange={(e) => setInitialState({...initialState, price: e.target.value})}/>
                           </div>
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
                                                {initialState?.img.map((image, index) => (
                                                    <SplideSlide key={index} style={{ position: "relative" }}>
                                                        <span className="delete" onClick={() => deleteImage(index)}><DeleteOutlined /></span>
                                                        <img src={image.img_url} alt={image.img} />
                                                    </SplideSlide>
                                                ))}
                                            </Splide>
                                        </>
                                    ) : (
                                        initialState?.img.map((image, index) => (
                                            <div className="image" key={index}>
                                                <span className="delete" onClick={() => deleteImage(index)}><DeleteOutlined /></span>
                                                <img src={image.img_url} alt={image.name} />
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </Box>)
                }
            })}
        </Box>
    );
};

export default UpdateAnnouncement;

