import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function GemIcon(props:any) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2L2 7l5.5 1 2.5 5L22 9l-6-2zm0 16l-5.5-4L2 18h4l2.5 4L12 18l3.5 4h4l-6.5-4z" />
    </SvgIcon>
  );
}

export default GemIcon;
