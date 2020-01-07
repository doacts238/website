import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = {
  container: { padding: 0, margin: 0 },
  item: { padding: 0, margin: 0 }
};

const GridNoPadding = withStyles(styles)(Grid);

export default GridNoPadding;
