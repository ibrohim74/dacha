import React, { useState, useEffect, useRef } from "react";

import styles from "./villas.module.css";
import Form from "../../components/form/Form";
import Filter from "../../components/filter/Filter";
import Button from "../../components/Button/Button";
import AppLayout from "../../components/appLayout/AppLayout";
import { getAllDacha } from "../home/API/homeAPI";
import AccomodationCard from "../../components/cottages/AccomodationCard";
import { useTranslation } from "react-i18next";

const Villas = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    getAllDacha(page)
      .then((r) => {
        console.log(r);
        setProducts(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  return (
    <AppLayout>
      <div className={styles["form-wrapper"]}>
        <Form />
      </div>

      <div className={styles["catalogue-layout"]}>
        <Filter />
        <div className={styles["catalogue-items"]}>
          {products.map((accommodation) => (
            <AccomodationCard
              accommodation={accommodation}
              key={accommodation.id}
            />
          ))}
          <Button type="full-width-white" onClick={() => setPage(page + 1)}>
            {t("view_more")}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Villas;
