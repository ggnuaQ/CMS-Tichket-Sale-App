import PropTypes from "prop-types";
import styles from "./index.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { useState } from "react";

const CheckTicketFilterPanel = (props: { onFilter: Function }) => {
  const { onFilter } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [status, setStatus] = useState("");

  const onChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };

  return (
    <div className={styles.checkTicketPanel}>
      <div className={styles.panelHeader}>
        <h3>Lọc vé</h3>
      </div>
      <div className={styles.dateRow}>
        <div className={styles.date}>
          <p className={styles.title}>Từ ngày</p>
          <div className={styles.dateOutput}>
            <div>{startDate.toDateString()}</div>
            <button onClick={() => setShowStartDate((prevState) => !prevState)}>
              <AiOutlineCalendar size={24} color="#FF993C" />
            </button>
          </div>
          <div className={styles.calendar}>
            {showStartDate && (
              <Calendar
                onChange={(dateStr: Date) => {
                  setStartDate(dateStr);
                  setShowStartDate(false);
                }}
                value={startDate}
                defaultView="month"
                maxDate={endDate}
              />
            )}
          </div>
        </div>
        <div className={styles.date}>
          <p className={styles.title}>Đến ngày</p>
          <div className={styles.dateOutput}>
            <div>{endDate.toDateString()}</div>
            <button onClick={() => setShowEndDate((prevState) => !prevState)}>
              <AiOutlineCalendar size={24} color="#FF993C" />
            </button>
          </div>
          <div className={styles.calendar}>
            {showEndDate && (
              <Calendar
                onChange={(dateStr: Date) => {
                  setEndDate(dateStr);
                  setShowEndDate(false);
                }}
                value={startDate}
                defaultView="month"
                minDate={startDate}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.statusRow}>
        <p className={styles.title}>Tình trạng đối soát</p>
        <div className={styles.statusRadios}>
          <label className={styles.radioContainer}>
            Tất cả
            <input
              type="radio"
              name="status"
              value="all"
              onChange={onChangeStatus}
            />
            <span className={styles.checkmark} />
          </label>
          <label className={styles.radioContainer}>
            Chưa đối soát
            <input
              type="radio"
              name="status"
              value="false"
              onChange={onChangeStatus}
            />
            <span className={styles.checkmark} />
          </label>
          <label className={styles.radioContainer}>
            Đã đối soát
            <input
              type="radio"
              name="status"
              value="true"
              onChange={onChangeStatus}
            />
            <span className={styles.checkmark} />
          </label>
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={() => onFilter(startDate, endDate, status)}>
          Lọc
        </button>
      </div>
    </div>
  );
};

CheckTicketFilterPanel.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default CheckTicketFilterPanel;
