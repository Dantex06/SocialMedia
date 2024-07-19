import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import cls from './Messages.module.scss';
import { UserMessage } from '@/widgets/UserMessage';




const Messages = () => {
    const [search, setSearch] = useState('');
    useEffect(() => {
        // console.log(search);
    }, [search]);

    return (
        <div className={cls.messages}>
            <div className={cls.search}>
             <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "90%", margin: "0 auto"}}
             >
              <InputBase
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               sx={{ ml: 1, flex: 1}}
               placeholder="Поиск"

               inputProps={{ 'aria-label': 'search google maps', margin: '0 auto' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
               <SearchIcon />
              </IconButton>
             </Paper>
            </div>
         <div className={cls.contacts}>
          <UserMessage/>
          <UserMessage/>
          <UserMessage/>
          <UserMessage/>
          <UserMessage/>
          <UserMessage/>
          <UserMessage/>
         </div>
        </div>
    );
};

export default Messages;
