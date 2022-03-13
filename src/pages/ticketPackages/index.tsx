import { useCallback, useState, useEffect } from "react";
import db from "../../firebase";
import Loader from "../../components/loader";
import TicketPackageHeader from "../../components/TicketPackageHeader";
import TicketPackageList, {
  IPackTicket,
} from "../../components/TicketPackageList";
import TicketPackageForm from "../../components/TicketPackageForm";
import exportArrayToCSV from "../../utils/csv_exporter";
import { useDispatch, useSelector } from "react-redux";
import {
  hideTicketPackageFormAction,
  showTicketPackageFormAction,
} from "../../store/actions";
import { RootState } from "../../store";
import Backdrop from "../../components/backdrop";

const TicketPackages = () => {
  const [tickets, setTickets] = useState<IPackTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<IPackTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { ticketPackageForm } = useSelector((state: RootState) => state.global);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    db.collection("ticketPackages")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const {
            expirationDate,
            applicableDate,
            comboPrice,
            price,
            code,
            name,
            status,
          } = doc.data();

          setTickets((prevState) => [
            ...prevState,
            {
              id: doc.id,
              expirationDate: new Date(
                expirationDate.seconds * 1000
              ).toLocaleDateString(),
              applicableDate: new Date(
                applicableDate.seconds * 1000
              ).toLocaleDateString(),
              comboPrice,
              price,
              code,
              name,
              status,
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

  const onSubmitForm = (ticketPackage: IPackTicket) => {
    const ticketPackageCollection = db.collection("ticketPackages");

    if (ticketPackageForm.ticketPackage) {
      ticketPackageCollection
        .doc(ticketPackageForm.ticketPackage.id)
        .update({
          ...ticketPackage,
        })
        .then(() => {
          setTickets(
            tickets.map((ticket) =>
              ticket.id === ticketPackageForm.ticketPackage.id
                ? { ...ticketPackage, id: ticketPackageForm.ticketPackage.id }
                : ticket
            )
          );
          dispatch(hideTicketPackageFormAction());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ticketPackageCollection
        .add(ticketPackage)
        .then((docRef) => {
          console.log(docRef.id);
          dispatch(hideTicketPackageFormAction());
          fetchData();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  const onExportCsvHandler = (): void => {
    return exportArrayToCSV(tickets, "ticket_packages");
  };

  const onEditTicketPackageHandler = (ticketPackage: IPackTicket) => {
    dispatch(showTicketPackageFormAction(ticketPackage));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Danh sách gói vé</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TicketPackageHeader
            onFilter={onFilterTicketByNo}
            onExport={onExportCsvHandler}
          />
          <TicketPackageList
            list={filteredTickets}
            onEdit={onEditTicketPackageHandler}
          />
        </>
      )}
      <TicketPackageForm onSubmit={onSubmitForm} />
      <Backdrop
        open={ticketPackageForm.isShow}
        onClick={() => dispatch(hideTicketPackageFormAction())}
      />
    </div>
  );
};

export default TicketPackages;
