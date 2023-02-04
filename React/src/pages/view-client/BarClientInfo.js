import "./BarClientInfo.css";
export default function BarClientInfo({ clientInfo, setIsPopupVisible }) {
  return (
    <div className="viewclient-clientinfo">
      <div className="viewclient-primary-info glasseffect-body">
        <div className="viewclient-clientinfo-cell">
          <p>Име: {clientInfo.firstName}</p>
        </div>
        <div className="viewclient-clientinfo-cell">
          <p>Фамилия: {clientInfo.lastName}</p>
        </div>
        <div className="viewclient-clientinfo-cell">
          <p>Телефон: {clientInfo.phone}</p>
        </div>
      </div>
      <div className="viewclient-owner-info glasseffect-body">
        <div
          className="viewclient-clientinfo-cell"
          style={{ flex: "none", paddingLeft: "0px" }}
        >
          <button
            onClick={() => {
              setIsPopupVisible(true);
            }}
            type="button"
            className="create-new-pet"
          >
            Нов любимец
          </button>
        </div>
        <div className="viewclient-clientinfo-cell">
          <p>Адрес: {clientInfo.address}</p>
        </div>
      </div>
    </div>
  );
}
