import React, { useEffect, useRef, useState } from "react";
import AppLayout from "../appLayout/AppLayout";
import Filter from "../filter/Filter";
import CottageCard from "../cottages/CottageCard";
import Button from "../Button/Button";
import styles from "./Catalogue.module.css";
import { useTranslation } from "react-i18next";
import Form from "../form/Form";

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
        <div className={styles["catalogue-items"]}>
          {products.map((product) => (
            <CottageCard cottage={product} key={product.id} />
          ))}
          <Button type="full-width-white">{t("view_more")}</Button>
        </div>
      </div>
    </AppLayout>
  );
}
