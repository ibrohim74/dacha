import React, { useEffect, useRef, useState } from "react";
import AppLayout from "../appLayout/AppLayout";
import Filter from "../filter/Filter";
import AccomodationCard from "../cottages/AccomodationCard";
import Button from "../Button/Button";
import styles from "./Catalogue.module.css";
import { useTranslation } from "react-i18next";
import Form from "../form/Form";
import { Icons } from "../../assets/icons/icons";

export default function Catalogue({ products }) {
  const { t } = useTranslation();
  const elementsRef = useRef(null);

  return (
    <AppLayout elementsRef={elementsRef}>
      <div className={styles["form-wrapper"]}>
        <Form />
      </div>

      <div className={styles["catalogue-layout"]}>
        <Filter />
        {products.length ? (
          <div className={styles["catalogue-items"]}>
            {products.map((product) => (
              <AccomodationCard accommodation={product} key={product.id} />
            ))}
            <Button type="full-width-white">{t("view_more")}</Button>
          </div>
        ) : (
          <div className={styles["catalogue-items-empty"]}>
            <Icons.EmptyPagePlaceholder />
            <p>Try to reload</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
