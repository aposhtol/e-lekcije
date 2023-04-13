import { useSelector } from 'react-redux';

const Notice = () => {
  const message = useSelector((state) => state.notification);

  if (message !== '') {
    return message;
  }
};

export default Notice;
