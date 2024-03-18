import { Box, Button } from '@mui/material';
import { fetcher } from 'helper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { accessTokenAtom, userSelector } from 'store';
import { DefaultTextField } from 'style';

interface SignUpFormTypes {
  displayName: string;
}

export function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormTypes>();

  let navigate = useNavigate();
  let location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRefresher = useRecoilRefresher_UNSTABLE(userSelector);
  const accessToken = useRecoilValue(accessTokenAtom);

  const onSubmit: SubmitHandler<SignUpFormTypes> = async (data) => {
    const { displayName } = data;
    try {
      await fetcher.post({
        path: '/users',
        bodyParams: { displayName },
        accessToken,
      });
      userRefresher();
      navigate(from);
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
              <DefaultTextField
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
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: (theme) => theme.palette.primary.light,
        }}
      >
        가입하기!
      </Button>
    </Box>
  );
}
