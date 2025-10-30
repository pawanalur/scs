function CurrentUser(props) {
  return (
    <div className="user__content">
      <div className="user__image">
        <img src={props.profileIcon} alt={props.fullName}></img>
      </div>
      <div className="user__content">
        <h3>{props.fullName}</h3>
        <br />
        <b>Mental Energy: </b>
        {props.mentalEnergy}
        <br />
        <b>Physical Energy: </b>
        {props.physicalEnergy}
      </div>
    </div>
  );
}

export default CurrentUser;
