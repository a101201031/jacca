import { Avatar, Box, Container, Typography } from '@mui/material';
import { SignUpForm } from 'form';

export function SignUp() {
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
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <Typography>Jacca</Typography>
        </Avatar>
        <Typography variant="h1">{`회원가입`}</Typography>
        <Typography variant="body1">{`작카 회원이 되어 여러 서비스를 이용해보세요!`}</Typography>
        <SignUpForm />
      </Box>
    </Container>
  );
}
