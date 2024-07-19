import { Avatar } from '@mui/material';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from "./UserMessage.module.scss";

export const UserMessage = () => {
 return (
  <div className={cls.contact}>
   <Avatar alt="Avatar" style={{width: "6vh", height: "6vh"}} src={ava} />
   <div className={cls.message}>
      <p className={cls.name}>
       Default name
      </p>
    <p className={cls.lstmessage}>Hi, how are you?</p>
   </div>
  </div>
 );
};
