import { useCallback, useState, useEffect } from "react";
import db from "../../firebase";
import Loader from "../../components/loader";
import CheckTicketList, {
  ICheckTicket,
} from "../../components/checkTicketList";
import CheckTicketHeader from "../../components/checkTicketListHeader";
import exportArrayToCSV from "../../utils/csv_exporter";
import styles from "./checkTickets.module.css";
import CheckTicketFilterPanel from "../../components/CheckTicketFilterPanel";

const CheckTickets = () => {
  const [tickets, setTickets] = useState<ICheckTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState<ICheckTicket[]>([]);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    db.collection("checkTickets")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const {
            bookingCode,
            createdDate,
            checkInPort,
            typeName,
            ticketNumber,
            eventName,
            isChecked,
          } = doc.data();
          setTickets((prevState) => [
            ...prevState,
            {
              id: doc.id,
              bookingCode,
              typeName,
              ticketNumber,
              createdDate,
              checkInPort,
              eventName,
              isChecked,
            },
          ]);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);

  const onFilterTicketByNo = (ticketNo: string) => {
    ticketNo === ""
      ? setFilteredTickets(tickets)
      : setFilteredTickets(
          tickets.filter((ticket) =>
            ticket.ticketNumber.toLowerCase().includes(ticketNo)
          )
        );
  };

  const onCheckTicket = (ticketId: string) => {
    db.collection("checkTickets")
      .doc(ticketId)
      .update({
        isChecked: true,
      })
      .then(() => {
        setTickets(
          tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, isChecked: true } : ticket
          )
        );
      });
  };

  const onExportCsvHandler = (): void => {
    return exportArrayToCSV(tickets, "check_tickets");
  };

  const onFilterTicketByStatus = (
    startDate: Date,
    endDate: Date,
    status: string
  ) => {
    status === "all"
      ? setFilteredTickets(tickets)
      : setFilteredTickets(
          tickets.filter((ticket) => ticket.isChecked === (status === "true"))
        );
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Đối soát vé</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CheckTicketHeader
            onFilter={onFilterTicketByNo}
            onExport={onExportCsvHandler}
          />
          <div className={styles.checkTicketMainWrapper}>
            <div className={styles.list}>
              <CheckTicketList list={filteredTickets} onCheck={onCheckTicket} />
            </div>
            <CheckTicketFilterPanel onFilter={onFilterTicketByStatus} />
          </div>
        </>
      )}
    </div>
  );
};

export default CheckTickets;
