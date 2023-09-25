import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { fetcher, isAxiosError } from 'helper';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from 'store';

interface CafeAddPopupProps {
  handleClose: () => void;
  isOpen: boolean;
}

interface CafeAddFormProps {
  handleClose: () => void;
}

interface Place {
  title: string;
  address: string;
  roadAddress: string;
}

export function CafeAddPopup({ handleClose, isOpen }: CafeAddPopupProps) {
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
        <CafeAddForm handleClose={handleClose} />
      </Dialog>
    </>
  );
}

function CafeAddForm({ handleClose }: CafeAddFormProps) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [keyword, setKeyword] = useState<string>('');
  const [placeOption, setPlaceOption] = useState<Place[]>([]);
  const [place, setPlace] = useState<Place>({
    title: '',
    address: '',
    roadAddress: '',
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    const updateData = async () => {
      const { place: resPlace } = await fetcher.get<{
        place: Place[];
      }>({ path: '/place', queryParams: { query: keyword } });
      setPlaceOption(resPlace);
    };
    const debounce = setTimeout(() => {
      if (keyword) {
        updateData();
      }
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoaded(false);

    try {
      await fetcher.post({
        path: '/cafe',
        bodyParams: { title: place.title, address: place.address },
        accessToken,
      });
    } catch (e) {
      if (isAxiosError<{ error: { code: string; message: string } }>(e)) {
        console.error(e);
      }
    } finally {
      setIsLoaded(true);
    }
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>카페 등록하기</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>카페 검색</Typography>
        <Autocomplete
          id="search-place"
          value={place}
          onChange={(_, newValue: any) => {
            setPlace(newValue);
          }}
          inputValue={keyword}
          onInputChange={(_, v) => {
            setKeyword(v);
          }}
          options={placeOption}
          noOptionsText="카페를 찾지 못했어요."
          getOptionLabel={(o) => (o.address ? `${o.title} - ${o.address}` : '')}
          filterOptions={(o) => o}
          isOptionEqualToValue={(o, v) =>
            o.title === v.title && o.address === v.address
          }
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label="카페 주소와 이름으로 검색해주세요"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit" disabled={!isLoaded}>
          추가
        </Button>
        <Button onClick={handleClose} disabled={!isLoaded}>
          취소
        </Button>
      </DialogActions>
    </form>
  );
}
