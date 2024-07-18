import { useMediaPredicate } from 'react-media-hook';
import { TextField } from '@mui/material';
import { ReactNode } from 'react';

interface TextFieldCustomProps {
    register: any; // Замените 'any' на конкретный тип, соответствующий вашей логике
    errors: any; // Замените 'any' на конкретный тип, соответствующий вашей логике
    label: string;
    type?: string;
    inputProps?: any; // Замените 'any' на конкретный тип, если необходимо
    endAdornment?: ReactNode;
}

export const FormValidate = {
    length: {
    required: 'Это поле обязательно!',
     minLength: {
        value: 3,
         message: 'Слишком мало символов',
    },
    maxLength: {
        value: 15,
         message: 'Слишком много символов',
    }},
    email: {
        required: 'Это поле обязательно!',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            message: 'Неправильный адрес почты',
        },
    },
    date: {
        required: 'Это поле обязательно!',
        pattern: {
            value: /^(19\d{2}|20(0[0-9]|1[0-4]))-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
            message: 'Вам должно быть не менее 10 лет!',
        },
    },
    password: {
        required: 'Это поле обязательно!',
        minLength: {
            value: 8,
            message: 'Слишком мало символов',
        },
        maxLength: {
            value: 30,
            message: 'Слишком много символов',
        },
    }
};

export const TextFieldCustom: React.FC<TextFieldCustomProps> = ({ register, errors, label, type="text", inputProps={}, endAdornment }) => {
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
      inputProps={inputProps}
      InputProps={{
          endAdornment: endAdornment
      }}
     />
    );
};
