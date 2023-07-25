import { CloseOutlined } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Dialog,
  IconButton,
  Link,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
} from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import { FlexBox } from 'style';
import googleLogo from 'assets/googleLogo.png';

interface LoginPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function LoginPopup({ open, setOpen }: LoginPopupProps) {
  function handleClose() {
    setOpen(false);
    document.body.style.overflow = 'unset';
  }
  async function googleLogin() {
    const auth = getAuth();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <LoginBackdrop open={open}>
      <LoginContainer>
        <LoginIntroBlock></LoginIntroBlock>
        <LoginContentBlock>
          <LoginExitWrapper>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </LoginExitWrapper>
          <LoginContent>
            <Box>
              <Typography variant="h6">로그인</Typography>
              <Box component="section">
                <Typography variant="body1" marginY="1.5rem">
                  소셜 계정으로 로그인
                </Typography>
                <FlexBox justifyContent="space-around" marginTop="1.5rem">
                  <SocialLogoButton onClick={googleLogin}>
                    <img
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '20px',
                        height: '20px',
                      }}
                      src={googleLogo}
                      alt="Google logo"
                    />
                  </SocialLogoButton>
                </FlexBox>
              </Box>
            </Box>
          </LoginContent>
          <Box textAlign="right">
            아직 계정이 없으신가요? <Link>회원가입</Link>
          </Box>
        </LoginContentBlock>
      </LoginContainer>
    </LoginBackdrop>
  );
}

const LoginBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;
const LoginContainer = styled(Paper)`
  width: 606px;
  height: 530px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 12px 0px;
  display: flex;
`;
const LoginIntroBlock = styled(Box)`
  width: 216px;
  background: ${({ theme }) => theme.palette.grey[200]};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;
const LoginContentBlock = styled(Box)`
  flex: 1 1 0%;
  background: ${({ theme }) => theme.palette.grey[100]};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;
const LoginExitWrapper = styled(Box)`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  font-size: 1.5rem;
  color: var(--text3);
  margin-bottom: 2.25rem;
`;
const LoginContent = styled(Box)`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`;
const SocialLogoButton = styled(IconButton)`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  outline: none;
  transition: all 0.125s ease-in 0s;
  color: white;
  border: 1px solid ${({ theme }) => theme.palette.grey[500]};
`;
