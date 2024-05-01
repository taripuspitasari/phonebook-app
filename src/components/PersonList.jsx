// components

const Person = ({person, onDelete}) => {
  const {name, number} = person;
  return (
    <li className="person">
      <p>
        {name} and {number}
      </p>
      <button className="delete-button" onClick={onDelete}>
        delete
      </button>
    </li>
  );
};

const PersonList = ({persons, onDelete}) => {
  return (
    <div className="personList">
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <Person
            key={person.id}
            person={person}
            onDelete={() => onDelete(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
