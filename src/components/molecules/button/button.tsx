import './button.scss';

type Props = {
  children: any;
  disabled?: boolean;
  width?: number;
};

export const Button = ({ children, disabled, width }: Props) => (
  <button className='common-button' style={{ width: `${width}px` }} type='button' disabled={disabled}>
    {children}
  </button>
);
