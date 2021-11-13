import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const VodList = ({
  vods,
  title,
  showTitle = true,
  showUsername = true,
}) => {    
  if (!vods.length) {
    return <h3>No Vods</h3>;
  } 
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (  
    <ThemeProvider theme={darkTheme}> 
    <Container sx={{ py: 8}}>
      <Grid container spacing={4}>
        {vods &&
        vods.map((vod) => (          
        <Grid item key={vod._id} xs={24}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
              <Link                
                to={`/vods/${vod._id}`}
              >
                Name of the Vod <br></br>
              </Link>
                {showUsername ? (
                  <Link                      
                    to={`/profiles/${vod.vodAuthor}`}
                  >                    
                    <span style={{ fontSize: '1rem' }}>
                      {vod.vodAuthor}
                    </span>
                  </Link>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>
                    {vod.vodAuthor}
                    </span>
                  </>
                )}
              </Typography>
            </CardContent>
            <CardContent sx={{display: 'flex', flexDirection: 'row' }}>
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  // pt: '56.25%',
                  height: 'auto',
                  width: '30vw'
                }}
                src={"https://img.youtube.com/vi/"+(vod.vodUrl).split("?v=").pop().split("&t").shift()+"/maxresdefault.jpg"}
                alt="titlegoeshere!"
              />             
              <Typography sx={{ px: 3 }}>
                  Video Description Here
              </Typography>
            </CardContent>            
          </Card>
        </Grid>
      ))}
      </Grid>
    </Container>    
    </ThemeProvider>              
  );
};

export default VodList;
