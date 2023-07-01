import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function BadgeAvatars({mother , children}) {
  return (
    <Stack direction="row" spacing={1}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Remy Sharp" src={children}/>
        }
      >
        <Avatar alt="Travis Howard" src={mother} />
      </Badge>
    </Stack>
  );
}