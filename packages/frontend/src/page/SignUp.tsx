import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { fetcher } from 'helper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import type { Location } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { accessTokenAtom, userSelector } from 'store';

type CustomLocationTypes = Omit<Location, 'state'> & {
  state?: { from?: { pathname: string } };
};

interface SignUpFormTypes {
  displayName: string;
}

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormTypes>();
  let navigate = useNavigate();
  let location = useLocation() as CustomLocationTypes;
  const from = location.state?.from?.pathname || '/';

  const userRefresher = useRecoilRefresher_UNSTABLE(userSelector);
  const accessToken = useRecoilValue(accessTokenAtom);

  const onSubmit: SubmitHandler<SignUpFormTypes> = async (data) => {
    const { displayName } = data;
    try {
      await fetcher.post({
        path: '/user',
        bodyParams: { displayName },
        accessToken,
      });
      userRefresher();
      navigate(from);
      console.log('navigate');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <Typography>JC</Typography>
        </Avatar>
        <Typography variant="h1">{`회원가입`}</Typography>
        <Typography variant="body1">{`작카 회원이 되어 여러 서비스를 이용해보세요!`}</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
          width={'90%'}
        >
          <Box>
            <Box marginY="2rem">
              <Controller
                name="displayName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    id="displayName"
                    label="닉네임"
                    autoComplete="displayName"
                    autoFocus
                    error={!!errors.displayName}
                    helperText={errors.displayName?.message}
                    {...field}
                  />
                )}
              />
            </Box>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            가입하기!
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
