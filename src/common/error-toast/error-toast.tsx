import { useState } from 'react';

import { ReactComponent as CloserIcon } from '../../assets/images/Icon_Close_black.svg';
import { ReactComponent as ErrorIcon } from '../../assets/images/Icon_Error.svg';

import './error-toast.scss';

export const ErrorToast = () => {
  const [showError, setShowError] = useState(true);
  const closeErrorToastHandler = () => {
    setShowError(false);
  };

  return (
    <div className={showError ? 'error-container' : 'error-container close'}>
      <div className='error-block' data-test-id='error'>
        <ErrorIcon />
        <span>Что-то пошло не так. Обновите страницу через некоторое время.</span>
        <CloserIcon onClick={closeErrorToastHandler} />
      </div>
    </div>
  );
};
