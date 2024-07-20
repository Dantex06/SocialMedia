import cls from './Loading.module.scss'
import ReactLoading from 'react-loading';


export const Loading = () => {
 return (
  <div className={cls.loading}>
   <ReactLoading type="spin" color="white" height="100%" width="100%" />
  </div>
 );
};
