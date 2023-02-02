import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);

  return (
    <button type="button" onClick={handleClick} className="mastheadBackButton" >
      <div style={{ fontSize: '20px' }} >🔙</div>
    </button>
  );
};
export default BackButton;
