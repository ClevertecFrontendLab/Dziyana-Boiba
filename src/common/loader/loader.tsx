import loader from '../../assets/images/loader.png';

import './loader.scss';

export const Loader = () => (
  <div className='loader-background' data-test-id='loader'>
    <img className='loader' src={loader} alt='Loading...' />
  </div>
);
