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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenAtom, alertSnackbarAtom } from 'store';

interface CafeAddPopupProps {
  handleClose: () => void;
  isOpen: boolean;
}

interface CafeTagAddPopupProps {
  cafeId: string;
  handleClose: () => void;
  isOpen: boolean;
}

interface CafeAddFormProps {
  handleClose: () => void;
}

interface CafeTagAddFormProps {
  cafeId: string;
  handleClose: () => void;
}

interface Place {
  title: string;
  address: string;
  roadAddress: string;
}

interface Tag {
  tag: string;
}

export function CafeAddPopup({ handleClose, isOpen }: CafeAddPopupProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
      <CafeAddForm handleClose={handleClose} />
    </Dialog>
  );
}

export function CafeTagAddPopup({
  cafeId,
  handleClose,
  isOpen,
}: CafeTagAddPopupProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
      <CafeTagAddForm handleClose={handleClose} cafeId={cafeId} />
    </Dialog>
  );
}

function CafeAddForm({ handleClose }: CafeAddFormProps) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const setSnackbar = useSetRecoilState(alertSnackbarAtom);
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
      setSnackbar({
        open: true,
        severity: 'success',
        message: '카페가 등록되었습니다.',
      });
      handleClose();
    } catch (e) {
      if (
        isAxiosError<{ error: { code: string; message: string } }>(e) &&
        e.response?.data.error.code === 'entity_already_exists'
      ) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: '카페가 이미 등록되어 있습니다.',
        });
      }
    } finally {
      setIsLoaded(true);
    }
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

function CafeTagAddForm({ cafeId, handleClose }: CafeTagAddFormProps) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const setSnackbar = useSetRecoilState(alertSnackbarAtom);
  const [keyword, setKeyword] = useState<string>('');
  const [tagOption, setTagOption] = useState<Tag[]>([]);
  const [tag, setTag] = useState<Tag>({
    tag: '',
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    const updateData = async () => {
      const { tags: resTag } = await fetcher.get<{
        tags: Tag[];
      }>({ path: '/cafe/tags', queryParams: { tag: keyword } });
      setTagOption(resTag.map((v) => ({ tag: v.tag })));
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
        path: `/cafe/${cafeId}/tag`,
        bodyParams: tag,
        accessToken,
      });
      setSnackbar({
        open: true,
        severity: 'success',
        message: '태그가 등록되었습니다.',
      });
      handleClose();
    } catch (e) {
      if (
        isAxiosError<{ error: { code: string; message: string } }>(e) &&
        e.response?.data.error.code === 'entity_already_exists'
      ) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: '태그가 이미 등록되어 있습니다.',
        });
      }
    } finally {
      setIsLoaded(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>태그 등록하기</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>태그 검색</Typography>
        <Autocomplete
          id="search-place"
          value={tag}
          onChange={(_, newValue: any) => {
            setTag(newValue);
          }}
          inputValue={keyword}
          onInputChange={(_, v) => {
            setKeyword(v);
          }}
          options={tagOption}
          noOptionsText="태그를 찾지 못했어요."
          getOptionLabel={(o) => o.tag}
          filterOptions={(o) => o}
          isOptionEqualToValue={(o, v) => o.tag === v.tag}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label="태그를 검색해주세요"
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
