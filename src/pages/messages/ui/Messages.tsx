import cls from './Messages.module.scss';
import { InputAdornment, TextField } from '@mui/material';
import LoupeIcon from '@mui/icons-material/Loupe';
import '@/shared/css/mui.css';
import { useEffect, useState } from 'react';

const Messages = () => {
    const [search, setSearch] = useState('');
    useEffect(() => {
        // console.log(search);
    }, [search]);

    return (
        <div className={cls.messages}>
            <div className={cls.search}>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    label="Поиск"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch', input: { color: 'white' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" style={{ color: 'white' }}>
                                <LoupeIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default Messages;
