import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {useLocation} from 'react-router-dom';
import getDateWithOffset from '../../../common/getDateWithOffset';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon, HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from "@heroicons/react/20/solid";

export default function NavigationBar() {
const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: "transparent", border: "none", boxShadow: "none"}}>
        <Toolbar>
          <div style={{float: "left"}}>

          {window.location.pathname.split('/')[1] == "date" ? <div>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              href={'/date/' + getDateWithOffset(location.pathname.substring(1), 1)}
            >
              <ArrowLeftCircleIcon width={30} height={30}/>

            </IconButton>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              href={'/date/' + getDateWithOffset(location.pathname.substring(1), -1)}
            >
              <ArrowRightCircleIcon width={30} height={30}/>
            </IconButton>
          </div> :  <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              href={'/'}
          >
            <HomeIcon width={30} height={30}/>
          </IconButton>}
          </div>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: "gray"}}>
            {window.location.pathname.split('/')[1] == "date" ?  <b> {location.pathname.substring(1).split("/")[1]} </b> :
                <b> #{location.pathname.substring(1).split("/")[1]} </b> }
          </Typography>

          <div style={{float: "right"}}>
          <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              href={'/searchtag'}
          >
            <MagnifyingGlassIcon width={30} height={30}/>
          </IconButton>

          <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              href={'/aboutyou'}
          >
            <UserCircleIcon width={30} height={30}/>
          </IconButton>

          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
