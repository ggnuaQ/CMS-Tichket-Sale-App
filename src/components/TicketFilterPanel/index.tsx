import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { RootState } from "../../store";
import styles from "./index.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { hideFilterPanelAction } from "../../store/actions/globalActions";
import Backdrop from "../backdrop";

const TicketFilterPanel = (props: { onFilter: Function }) => {
  const { onFilter } = props;

  const { ticketFilterPanel } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [status, setStatus] = useState("");
  const [ports, setPorts] = useState<string[]>([]);

  const onChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };

  const onAddPort = (e: any) => {
    const port = e.target.value;

    if (!ports.includes(port) && e.target.checked) {
      setPorts([...ports, port]);
    }

    if (ports.includes(port) && !e.target.checked) {
      setPorts(ports.filter((p) => p !== port));
    }
  };

  return (
    <>
      <div
        className={[
          styles.panel,
          ticketFilterPanel.isShow ? styles.show : "",
        ].join(" ")}
      >
        <div className={styles.panelHeader}>
          <h3>Lọc vé</h3>
          <button onClick={() => dispatch(hideFilterPanelAction())}>
            <FaTimes size={18} />
          </button>
        </div>
        <div className={styles.dateRow}>
          <div className={styles.date}>
            <p className={styles.title}>Từ ngày</p>
            <div className={styles.dateOutput}>
              <div>{startDate.toDateString()}</div>
              <button
                onClick={() => setShowStartDate((prevState) => !prevState)}
              >
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
          <p className={styles.title}>Tình trạng sử dụng</p>
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
              Đã sử dụng
              <input
                type="radio"
                name="status"
                value="used"
                onChange={onChangeStatus}
              />
              <span className={styles.checkmark} />
            </label>
            <label className={styles.radioContainer}>
              Chưa sử dụng
              <input
                type="radio"
                name="status"
                value="not-used"
                onChange={onChangeStatus}
              />
              <span className={styles.checkmark} />
            </label>
            <label className={styles.radioContainer}>
              Hết hạn
              <input
                type="radio"
                name="status"
                value="expired"
                onChange={onChangeStatus}
              />
              <span className={styles.checkmark} />
            </label>
          </div>
        </div>
        <div className={styles.portRow}>
          <p className={styles.title}>Cổng Check - in</p>
          <div className={styles.portOptions}>
            <div>
              <label className={styles.checkboxContainer}>
                Tất cả
                <input type="checkbox" value="all" onChange={onAddPort} />
                <span className={styles.checkmarkCheckbox} />
              </label>
            </div>
            <div>
              <label className={styles.checkboxContainer}>
                Cổng 1
                <input type="checkbox" value="1" onChange={onAddPort} />
                <span className={styles.checkmarkCheckbox} />
              </label>
            </div>
            <div>
              <label className={styles.checkboxContainer}>
                Cổng 2
                <input type="checkbox" value="2" onChange={onAddPort} />
                <span className={styles.checkmarkCheckbox} />
              </label>
            </div>
            <div>
              <label className={styles.checkboxContainer}>
                Cổng 3
                <input type="checkbox" value="3" onChange={onAddPort} />
                <span className={styles.checkmarkCheckbox} />
              </label>
            </div>
            <div>
              <label className={styles.checkboxContainer}>
                Cổng 4
                <input type="checkbox" value="4" onChange={onAddPort} />
                <span className={styles.checkmarkCheckbox} />
              </label>
            </div>
            <div>
              <label className={styles.checkboxContainer}>
                Cổng 5
                <input type="checkbox" value="5" onChange={onAddPort} />
                <span className={styles.checkmarkCheckbox} />
              </label>
            </div>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button onClick={() => onFilter(startDate, endDate, status, ports)}>
            Lọc
          </button>
        </div>
      </div>
      <Backdrop
        open={ticketFilterPanel.isShow}
        onClick={() => dispatch(hideFilterPanelAction())}
      />
    </>
  );
};

TicketFilterPanel.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default TicketFilterPanel;
