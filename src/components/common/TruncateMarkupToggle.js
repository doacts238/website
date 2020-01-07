/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { makeStyles, Link } from '@material-ui/core';

import TruncateMarkup from 'react-truncate-markup';

import classNames from 'classnames';

type Props = {
  className: String,
  children: any,
  lines: Number,
  moreText: String,
  lessText: String
};

const TruncateMarkupToggle = ({
  className,
  children,
  lines = 4,
  moreText = 'Read more...',
  lessText = 'Show less...',
  ...otherProps
}: Props) => {
  const classes = useStyles();
  const [truncated, setTruncated] = useState(true);
  const [requiresTruncation, setRequiresTruncation] = useState(true);

  return (
    <Fragment>
      <TruncateMarkup
        lines={truncated ? lines : 10000000}
        onTruncate={wasTruncated => {
          setRequiresTruncation(wasTruncated);
          setTruncated(wasTruncated && truncated);
        }}
        {...otherProps}
      >
        {children}
      </TruncateMarkup>
      <Link
        className={classNames({
          [classes.moreless]: true,
          [classes.displayNone]: !requiresTruncation
        })}
        color="textSecondary"
        onClick={() => {
          setTruncated(!truncated);
        }}
      >
        {truncated ? moreText : lessText}
      </Link>
    </Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  moreless: {
    fontSize: 12,
    fontStyle: 'italic',
    margin: 0,
    padding: 0
  },
  displayNone: {
    display: 'none'
  }
}));

export default TruncateMarkupToggle;
