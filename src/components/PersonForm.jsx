const PersonForm = ({
  submitHandler,
  newName,
  nameChangeHandler,
  newNumber,
  numberChangeHandler,
}) => {
  return (
    <div className="personForm">
      <h2>Add new number</h2>
      <form onSubmit={submitHandler}>
        <div className="formElement">
          <label>name:</label>
          <input value={newName} onChange={nameChangeHandler} />
        </div>
        <div className="formElement">
          <label>number:</label>
          <input value={newNumber} onChange={numberChangeHandler} />
        </div>
        <div className="formElement">
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
