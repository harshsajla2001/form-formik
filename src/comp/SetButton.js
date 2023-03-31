import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from '@mui/material';

const SetButton = ({
  children,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();

  const handleSetvalue = () => {
    setFieldValue();
  }

  const configButton = {
    variant: "outlined",
    color: 'primary',
    fullWidth: true,
    onClick: handleSetvalue
  }

  return (
    <Button
      {...configButton}
    >
      {children}
    </Button>
  );
};

export default SetButton;
