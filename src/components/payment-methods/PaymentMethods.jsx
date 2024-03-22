import React, { useEffect, useRef, useState } from "react";
import { Icons } from "../../assets/icons/icons";
import styles from "./PaymentMethods.module.css";
import Button from "../Button/Button";
import VerificationInput from "react-verification-input";
import { useTranslation } from "react-i18next";
import { cc_format, formatExpDate } from "./helpers";

export default function PaymentMethods() {
  const { t } = useTranslation();
  const [paymentState, setPaymentState] = useState({
    hasCards: [],
    addingCard: false,
    confirmationStep: false,
  });

  const dummycards = [];

  const handleAddCard = () => {
    setPaymentState((prevState) => ({ ...prevState, addingCard: true }));
  };

  const handleSaveCard = () => {
    setPaymentState((prevState) => ({
      ...prevState,
      confirmationStep: true,
    }));
    console.log(paymentState.confirmationStep);
    console.log("save");
  };

  //   useEffect(() => {
  //     async function fetchCardData() {

  //       const response = await fetch('/api/user/cards');
  //       const cards = await response.json();
  //       setPaymentState((prevState) => ({ ...prevState, hasCards: cards }));
  //     }

  //     fetchCardData();
  //   }, []);

  useEffect(() => {
    const hasCards = dummycards.length > 0;
    setPaymentState((prevState) => ({ ...prevState, hasCards }));
  }, []);

  const handleSaveConfirmation = () => {
    setPaymentState((prevState) => ({
      ...prevState,
      hasCards: true,
      confirmationStep: false,
    }));
  };

  const renderContent = () => {
    if (paymentState.hasCards) {
      return <PaymentCard />;
    } else if (!paymentState.addingCard) {
      return (
        <>
          <PaymentCardsNotFound onAddCard={handleAddCard} />
        </>
      );
    } else if (paymentState.addingCard) {
      return <AddPaymentCard onSaveCardDetails={handleSaveCard} />;
    } else if (paymentState.addingCard && paymentState.confirmationStep) {
      return <CreditCardConfirmation />;
    }
  };

  return <div className={styles["payment-modal"]}>{renderContent()}</div>;
}

const PaymentCard = () => {
  const formatCardNumber = (number) => {
    if (!number || number.length !== 16) {
      return "";
    }

    // Capture the first 6 digits
    const firstSix = number.slice(0, 6);
    // Capture the last 4 digits
    const lastFour = number.slice(12);
    // Replace the middle 6 digits with the same number of asterisks
    const middle = "*".repeat(6);

    return `${firstSix} ${middle} ${lastFour}`;
  };

  const formattedCardNumber = formatCardNumber("1414141425252525");

  console.log(formattedCardNumber);

  return (
    <div className={styles["credit-card"]}>
      <div className={styles["credit-card-wrapper"]}>
        <div className={styles["credit-card-icon"]}>
          <Icons.Card />
        </div>

        <div className={styles["credit-card-info"]}>
          <span className={styles["credit-card-number"]}>
            8600 33** **** 9051
          </span>
          <span className={styles["credit-card-exp"]}>12/25</span>
        </div>
      </div>

      <button className={styles["credit-card-remove"]}>
        <Icons.Remove />
      </button>
    </div>
  );
};

const PaymentCardsNotFound = ({ onAddCard }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["credit-card-not-found"]}>
      <p>{t("no_cards_found")}</p>

      <Button type="full-width-primary" onClick={onAddCard}>
        {t("add_card")}
      </Button>
    </div>
  );
};

const AddPaymentCard = ({ onSaveCardDetails }) => {
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event) => {
    const { target } = event;
    if (target.id === "credit-card-number") {
      setCardNumber(target.value);
    } else if (target.id === "credit-card-exp") {
      const formattedExpDate = formatExpDate(event.target.value);
      setExpDate(formattedExpDate);
      setIsButtonDisabled(!(cardNumber && formattedExpDate));
    }
  };

  return (
    <div className={styles["credit-card-add"]}>
      <div className={styles["credit-card-input-box"]}>
        <label
          htmlFor="credit-card-number"
          className={styles["credit-card-label"]}
        >
          {t("enter_card_number")}
        </label>
        <input
          type="text"
          id="credit-card-number"
          className={styles["credit-card-input"]}
          maxLength={19}
          value={cc_format(cardNumber)}
          onChange={handleInputChange}
          placeholder="0000 0000 0000 0000"
        />
      </div>

      <div className={styles["credit-card-input-box"]}>
        <label
          htmlFor="credit-card-number"
          className={styles["credit-card-label"]}
        >
          {t("enter_card_exp")}
        </label>
        <input
          type="text"
          id="credit-card-exp"
          className={styles["credit-card-input"]}
          maxLength={5}
          value={expDate}
          onChange={handleInputChange}
          placeholder="00/00"
        />
      </div>

      <Button
        type="full-width-primary"
        disabled={isButtonDisabled}
        onClick={onSaveCardDetails}
      >
        {t("save")}
      </Button>
    </div>
  );
};

const CreditCardConfirmation = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["credit-card-confirmation"]}>
      <p>{t("confirm_card_text")}</p>
      <span>+998 71 2** ** *9</span>

      <div className={styles["credit-card-verification"]}>
        <p>{t("confirm_card_code")}</p>
        <VerificationInput
          length={5}
          placeholder="|"
          autoFocus
          validChars="0-9"
          inputProps={{ inputMode: "numeric" }}
          classNames={{
            character: styles["character"],
            characterSelected: styles["character-selected"],
          }}
        />
      </div>

      <Button type="full-width-primary">{t("save")}</Button>
    </div>
  );
};
