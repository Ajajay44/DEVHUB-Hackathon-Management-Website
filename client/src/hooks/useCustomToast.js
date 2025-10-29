import { useToast } from '@chakra-ui/react';
import CustomToast from '../components/CustomToast';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({ title, status = 'info', duration = 3000 }) => {
    toast({
      position: 'top',
      duration,
      render: () => <CustomToast title={title} status={status} />,
    });
  };

  return {
    success: (title) => showToast({ title, status: 'success' }),
    error: (title) => showToast({ title, status: 'error' }),
    warning: (title) => showToast({ title, status: 'warning' }),
    info: (title) => showToast({ title, status: 'info' }),
  };
};

export default useCustomToast;