import { CloseOutlined } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  IconButton,
  Link,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import googleLogo from 'assets/googleLogo.png';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import { FlexBox } from 'style';

interface LoginPopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function LoginPopup({ isOpen, setIsOpen }: LoginPopupProps) {
  function handleClose() {
    setIsOpen(false);
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
    <LoginBackdrop open={isOpen}>
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
