import React, { Fragment } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import topImage from '../images/actsTop.jpg';

import classNames from 'classnames';

type Props = {
  className?: string
};

const PageDoActs238 = ({ className }: Props) => {
  const classes = useStyles();

  document.title = 'Do Acts 2:38 - Why Do Acts 2:38?';

  return (
    <Fragment>
      <img src={topImage} alt="Clouds over lake" className={classes.topImage} />
      <div className={classNames(className, classes.root)}>
        <Typography component="div" variant="body2" color="textPrimary">
          <h1 style={{ marginTop: 0 }}>Do Acts 2:38?</h1>

          <p>
            On our Church sign, business cards, letterhead and even in the URL
            of our website we proudly tout the slogan, "Do Acts 2:38". You might
            ask, "Why?" There are several reasons that this ministry has chosen
            to align itself squarely under the banner of this important passage
            of scripture.
          </p>

          <div className={classes.calloutRight} style={{ textAlign: 'center' }}>
            <div className={classes.textBox}>
              <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                " ... they were pricked in their heart, and said unto Peter and
                to the rest of the apostles, Men and brethren,{' '}
                <span style={{ textDecoration: 'underline' }}>
                  what shall we do?
                </span>{' '}
                Then Peter said unto them, 'Repent, and be baptized every one of
                you in the name of Jesus Christ for the remission of sins, and
                ye shall receive the gift of the Holy Ghost.'"
              </div>
              <div className={classes.calloutCaption}>Acts 2:37-38</div>
            </div>
          </div>

          <p>
            We believe its message is central to the issue of salvation. In Acts
            2:37 we see the audience under heavy conviction as Peter is
            concluding the first sermon of the early Church. The crowd, seeking
            remedy from the burden of sin, replies to Peter and to the rest of
            the apostles, "... what shall we do?" In effect, they were asking
            what they must do to obtain salvation. Note that the focus here is
            not on empty faith without action. In our obedient doing of the
            word, we find salvation, not in "believing" only. Saving faith is
            faith that acts; without works, faith is dead. James 1:22 tells us
            to guard against deception by being doers of the word, and not
            hearers only.
          </p>

          <p>
            Paul's definition of the gospel was threefold: the death, burial and
            resurrection of Christ (I Corinthians 15:1-4). Paul said that the
            "obeyed" gospel saves us (Romans 10:16). The concept of obedience
            implies action, rather than inactive belief. How then does one
            "obey" or "do" the gospel?{' '}
          </p>

          <p>
            Some argue that an individual can do nothing more than believe,
            repent and accept Jesus as Savior. Of a truth, that is indeed all
            that the sinner can do. However, careful consideration will find
            that this view stops short of the full counsel of God's Word.
            Peter's reply was threefold. The question was, "What must we do?"
            The answer referenced the doing of three things. Peter's admonition
            to "Repent" implies the concept of faith, belief, turning from sin,
            dying to self, etc., thus obeying Christ's death. However, that
            still leaves two additional commands, equally important in this
            biblical prescription for a sin-stricken heart.
          </p>

          <p>
            We must also obey his burial. We do this as we submit to the Church
            baptizing us into Christ and for the remission of our sins, calling
            on the saving name of Jesus. "For there is none other name under
            heaven given among men, whereby we must be saved". Acts 4:12.{' '}
          </p>

          <p>
            Finally, we must obey his resurrection. This is done as we yield
            ourselves to the infilling of God's spirit. "... if the Spirit of
            him that raised up Jesus from the dead dwell in you, he that raised
            up Christ from the dead shall also quicken your mortal bodies by his
            Spirit that dwelleth in you." Romans 8:11. In addition, Colossians
            1:27 says, "... Christ in you the hope of glory".
          </p>

          <p>
            In summary the individual must obey Christ's death in repentance,
            his burial in baptism and his resurrection in the infilling of the
            spirit. From another perspective, in the work of salvation, there is
            something that the individual does (repent), something the Church
            does (baptize), and something that God does (fill with the Spirit).
          </p>

          <p>What shall we do?</p>

          <h1>Do Acts 2:38!</h1>
        </Typography>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    marginLeft: 'auto',
    marginReft: 'auto',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
    width: '100%',
    minHeight: '100%',
    backgroundColor: theme.palette.background.default
  },
  calloutRight: {
    margin: theme.spacing(3),
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginRight: 'auto',
      marginLeft: 'auto',
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
      float: 'right',
      position: 'relative' /* fix IE peekaboo bug */,
      marginTop: 0,
      marginRight: 0
    }
  },
  textBox: {
    border: '1px dotted #55411C',
    margin: '5px',
    padding: '10px',
    borderRadius: theme.spacing(1)
  },
  calloutCaption: {
    borderTop: '1pt dotted #A8946F',
    margin: 0,
    marginTop: '5px',
    padding: 0,
    paddingTop: '5px'
  },
  topImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    [theme.breakpoints.up('md')]: {
      borderBottomLeftRadius: '10px'
    },
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default
  }
}));

export default PageDoActs238;
