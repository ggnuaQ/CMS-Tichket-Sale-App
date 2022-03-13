import TicketList, { ITicket } from "../../components/ticketList";
import TicketHeader from "../../components/TicketHeader";
import TicketFilterPanel from "../../components/TicketFilterPanel";
import { useCallback, useState, useEffect } from "react";
import db from "../../firebase";
import Loader from "../../components/loader";
import exportArrayToCSV from "../../utils/csv_exporter";
import { useDispatch } from "react-redux";
import { hideFilterPanelAction } from "../../store/actions/globalActions";

const Tickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setTickets([]);
    db.collection("database")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const {
            bookingCode,
            status,
            usedDate,
            createdDate,
            checkInPort,
            event,
          } = doc.data();
          setTickets((prevState) => [
            ...prevState,
            {
              id: doc.id,
              bookingCode,
              status,
              usedDate,
              createdDate,
              checkInPort,
              event,
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
    setFilteredTickets(tickets);
  }, [tickets]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onFilterTicketByNo = (ticketNo: string) => {
    ticketNo === ""
      ? setFilteredTickets(tickets)
      : setFilteredTickets(
          tickets.filter((ticket) => ticket.id.includes(ticketNo))
        );
  };

  const onFilterTicketByPanel = (
    startDate: string,
    endDate: string,
    status: string,
    ports: [string]
  ) => {
    const filteredTicketsList = tickets.filter((ticket) => {
      let isValid = true;

      if (status === "all") {
        isValid = true;
      }
      if (status !== "all") {
        isValid = ticket.status === status;
      }

      if (ports.length > 0) {
        isValid = isValid && ports.includes(ticket.checkInPort);
      }

      return isValid;
    });
    setFilteredTickets(filteredTicketsList);

    dispatch(hideFilterPanelAction());
  };

  const onExportCsvHandler = (): void => {
    return exportArrayToCSV(tickets, "tickets");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Danh sách vé</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TicketHeader
            onFilter={onFilterTicketByNo}
            onExport={onExportCsvHandler}
          />
          <TicketList list={filteredTickets} />
        </>
      )}
      <TicketFilterPanel onFilter={onFilterTicketByPanel} />
    </div>
  );
};

export default Tickets;
