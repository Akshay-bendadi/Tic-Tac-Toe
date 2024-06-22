import { useState } from "react";
export default function Player({ Playername, symbol, isActive, onChangeName }) {
  const [name, setName] = useState(Playername);
  const [Edit, setEdit] = useState(false);

  const HandleEdit = () => {
    setEdit((Edit) => !Edit);
    if (Edit) {
      onChangeName(symbol, name);
    }
  };

  const ChangeName = (event) => {
    setName(event.target.value);
  };

  let Edit_name = <span className="player-name">{name}</span>;

  let button_name = "Edit";

  if (Edit) {
    Edit_name = (
      <input type="text" required value={name} onChange={ChangeName} />
    );

    button_name = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {Edit_name}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={HandleEdit}>{button_name}</button>
    </li>
  );
}
