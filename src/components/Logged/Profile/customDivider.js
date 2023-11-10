import { forwardRef } from 'react';

import Divider from '@mui/material/Divider';

const CustomDivider = forwardRef(({ children, sx={}, ...other}, ref) => {
    return (
        <Divider {...other} sx={{ borderColor: 'rgba(0,0,0,0.2)', ...sx }} >
            {children}
        </Divider>
    )
})

export default CustomDivider