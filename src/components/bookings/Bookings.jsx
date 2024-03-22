import React, { useEffect, useState } from "react";
import Tabs from "../tabs/Tabs";
import { LocationOnOutlined } from "@mui/icons-material";
import styles from "./Bookings.module.css";
import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { GetUserBooking } from "../../page/user_Page/userRequest/api/user_requestAPI";
import { useTranslation } from "react-i18next";
import AppLayout from "../appLayout/AppLayout";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    GetUserBooking()
      .then((res) => {
        if (res.status === 200) {
          setBookings(res?.data);
        } else {
          console.error("getUserRequest:", r.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user requests:", error);
      });
  }, []);

  console.log(bookings.length);

  return (
    <AppLayout>
      <div className={styles["booking-page"]}>
        <Tabs
          firstTab={t("booking_first_tab")}
          secondTab={t("booking_second_tab")}
          type="page-tabs"
          content={{
            firstTab: (
              <>
                {bookings.length > 0 && (
                  <>
                    {bookings.map((booking) => (
                      <BookingCard booking={booking} key={booking.id} />
                    ))}
                  </>
                )}
                {bookings.length === 0 && (
                  <p className={styles["bookings-no-data"]}>
                    You don't have any current bookings.
                  </p>
                )}
              </>
            ),

            secondTab: (
              <>
                <p className={styles["bookings-no-data"]}>
                  You don't have any data in your history.
                </p>
              </>
            ),
          }}
        />
      </div>
    </AppLayout>
  );
}

const BookingCard = ({ booking }) => {
  const { title, status, address, final_price, adults, phone_number } = booking;
  return (
    <div className={styles["booking-card"]}>
      <h4>{title}</h4>

      <div className={styles["booking-card-address"]}>
        <LocationOnOutlined />
        {address}
      </div>

      <div className={styles["booking-card-info"]}>
        <div className={styles["booking-card-price-box"]}>
          <span>per day</span>

          <p className={styles["booking-card-price"]}>{final_price} som</p>
        </div>
        <p>{adults} people</p>
      </div>

      <BookingStatus status={status} />

      {status === "accepted" && (
        <div className={styles["booking-accepted-number"]}>{phone_number}</div>
      )}

      {status === "rejected" && (
        <div className={styles["booking-rejected"]}>
          <InfoCircleOutlined />
          <p>
            Это бронирование было дополнительно проверено и отклонено потому что
            вы этого не стоите
          </p>
        </div>
      )}
    </div>
  );
};

const BookingStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div className={`${styles["booking-status"]} ${styles[`${status}`]}`}>
      <span>
        {status === "pending" && (
          <>
            <ClockCircleOutlined />
            <p>{t("booking_pending")}</p>
          </>
        )}

        {status === "rejected" && (
          <>
            <CloseOutlined />
            <p>{t("booking_rejected")}</p>
          </>
        )}

        {status === "approved" && (
          <>
            <CheckOutlined />
            <p>{t("booking_approved")}</p>
          </>
        )}
      </span>
    </div>
  );
};

const EmptyBookingTab = () => {};

const BookingTabs = () => {};
