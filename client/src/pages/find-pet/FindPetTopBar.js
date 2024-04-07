import "./FindPetTopBar.css";
export default function FindPetTopBar({ petSearchTerm, setPetSearchTerm }) {
  return (
    <div className="findpet-bar-wrapper">
      <h2 className="findpet-bar-heading">Търси любимец</h2>
      <div className="findpet-bar-input-wrapper">
        <div style={{ display: "flex" }}>
          <input
            placeholder="Въведете име на любимец"
            value={petSearchTerm}
            onChange={(e) => {
              setPetSearchTerm(e.target.value);
            }}
            className="findpet-bar-input"
          ></input>
        </div>
      </div>
    </div>
  );
}
