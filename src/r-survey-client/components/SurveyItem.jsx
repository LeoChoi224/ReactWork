import { Link } from 'react-router-dom';

const SurveyItem = (props) => {

  const { id, name, created_at } = props.survey;

  return (
    <>
      <tr key={id}>
        <td>{id}</td>
        <td>
          <Link to={"/detail/" + id} className="text-decoration-none">{name}</Link>
        </td>
        <td>{created_at}</td>
      </tr>
    </>
  );
};

export default SurveyItem;