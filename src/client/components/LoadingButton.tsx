import React from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import type { ButtonProps } from '@material-ui/core/Button';

interface ILoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'inline-block'
  },
  spinner: {
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 12px)'
  },
  button: {
    width: '100%'
  }
});

const LoadingButton = (props: ILoadingButtonProps): JSX.Element => {
  const classes = useStyles();
  const { loading } = props;

  const className = `${classes.button}${
    props?.className ? ' ' + props.className : ''
  }`;

  const buttonProps = { ...props };
  delete buttonProps.loading;

  return (
    <div className={classes.container}>
      <Button
        {...buttonProps}
        className={className}
        disabled={props?.loading || props?.disabled}
      />
      {loading && <CircularProgress size={24} className={classes.spinner} />}
    </div>
  );
};

export default LoadingButton;
