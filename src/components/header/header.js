import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: '#f5f5f5',
    color: "#111",
  },
  appBar: {
    zIndex: 1000
  },
}));

const Header = ({ cart }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="relative">
      <Toolbar className={classes.toolbar}>
<Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Our Store</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Cart ({cart.length})</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(Header);
