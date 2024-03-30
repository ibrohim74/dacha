import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./GallerySlider.module.css";

export default function GallerySlider({ images: apiImages }) {
  //for demo purposes
  const images = [
    {
      original:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      thumbnail:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      originalClass: styles["original-class"],
      thumbnailClass: styles["thumbnail-class"],
    },
    {
      original:
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      thumbnail:
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      originalClass: styles["original-class"],
      thumbnailClass: styles["thumbnail-class"],
    },
    {
      original:
        "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      originalClass: styles["original-class"],
      thumbnailClass: styles["thumbnail-class"],
    },
  ];

  const noImagesCase_template = {
    original: require("../../assets/no-photos-placeholder.png"),
    thumbnail: require("../../assets/no-photos-placeholder.png"),
    originalClass: styles["original-class"],
    thumbnailClass: styles["thumbnail-class"],
  };

  const generateNoImagesCase = (numItems) => {
    return Array.from({ length: numItems }, () => ({
      ...noImagesCase_template,
    }));
  };

  const processedImages =
    apiImages?.length > 0
      ? apiImages.map((image) => ({
          original: image.imageUrl || image.url,
          thumbnail: image.imageUrl,
          originalClass: styles["original-class"],
          thumbnailClass: styles["thumbnail-class"],
        }))
      : generateNoImagesCase(3);

  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      renderItem={(item) => (
        <img src={item.original} className={item.originalClass} />
      )}
    />
  );
}
