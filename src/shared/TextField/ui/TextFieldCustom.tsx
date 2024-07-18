import { useMediaPredicate } from 'react-media-hook';
import { TextField } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const TextFieldCustom = ({ register, errors, label, type="text"}) => {

    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    return (
        <TextField
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: 'white' } }}
            style={lessThan720 ? { width: '39vh', margin: '0 0 1vh 3vh' } : { margin: '2vh 0', color: 'white' }}
            label={label}
            type={type}
            {...register}
            error={!!errors}
            helperText={errors?.message}
        />
    );
};
