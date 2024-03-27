import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { message } from 'antd';
import style from '../assets/create_ann.module.css';
import { Icons } from '../../../../assets/icons/icons';

const AnnCreateAddPhoto = (props) => {
    const [images, setImages] = useState([]);
    const { arrayImages, setArrayImages } = props;
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE_IN_MB = 50;
    const MAX_IMAGES_COUNT = 8;

    console.log(images);

    const getFileSizeInMB = (file) => {
        return file.size / (1024 * 1024);
    };

    useEffect(() => {
        setArrayImages(images.map(image => image.file));
    }, [images, setArrayImages]);

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
                // Saqlash uchun rasmni olish
                const imageUrl = URL.createObjectURL(files[i]);
                // Rasmni saqlash
                setImages(prevImages => [...prevImages, { url: imageUrl, file: files[i] }]);
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }

        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };

    const deleteImage = (index) => {
        // Rasmni o'chirish
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
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
                // Saqlash uchun rasmni olish
                const imageUrl = URL.createObjectURL(files[i]);
                // Rasmni saqlash
                setImages(prevImages => [...prevImages, { url: imageUrl, file: files[i] }]);
            } else {
                message.error(`Fayl hajmi belgilangan chegardan katta: ${fileSizeInMB.toFixed(2)} MB`);
            }
        }

        message.success('Rasmlar muvaffaqiyatli yuklandi');
    };

    return (
        <div>
            <div
                className={style.create_ann_photo_box}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                {images.length > 0 ? (
                    <div className={style.create_ann_photo_select_box}>
                        <>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {images.map((image, index) => (
                                    <div key={index} className={style.create_ann_photo}>
                                        <img src={image.url} alt={'Rasm'} />
                                        <button onClick={() => deleteImage(index)}>
                                            <Icons.DeleteImgIcon />
                                        </button>
                                    </div>
                                ))}
                                <div
                                    className={style.create_ann_photo_select_box_item}
                                    onClick={() => fileInputRef.current.click()}
                                    style={mediaQuery ? { width: '150px' } : {}}
                                >
                                    {isDragging ? (
                                        <span className="select" style={{ color: '#70d8bd' }}>
                                            принесите картинку сюда
                                        </span>
                                    ) : (
                                        <>
                                            <span className="select browse-btn" role={'button'}>
                                                <p>Добавить фото продукта</p>
                                                <p>*Минимум 5 фото</p>
                                            </span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        name={'file'}
                                        className={'file'}
                                        multiple
                                        ref={fileInputRef}
                                        onChange={onFileSelect}
                                    ></input>
                                </div>
                            </div>
                        </>
                    </div>
                ) : (
                    <div
                        className={style.create_ann_photo_select_box_item}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <div className={style.create_ann_photo_select_box_item} onClick={() => fileInputRef.current.click()}>
                            {isDragging ? (
                                <span className="select" style={{ color: '#70d8bd' }}>
                                    принесите картинку сюда
                                </span>
                            ) : (
                                <>
                                    <span className="select browse-btn" role={'button'}>
                                        <p>Добавить фото продукта</p>
                                        <p>*Минимум 5 фото</p>
                                    </span>
                                </>
                            )}
                            <input
                                type="file"
                                name={'file'}
                                className={'file'}
                                multiple
                                ref={fileInputRef}
                                onChange={onFileSelect}
                            ></input>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnnCreateAddPhoto;
