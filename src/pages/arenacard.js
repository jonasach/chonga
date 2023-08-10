import React, { useState, useContext, useEffect } from 'react';
import { Card, CardHeader, CardContent, Avatar, IconButton, Collapse } from '@mui/material';
import { red,blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppContext from 'src/contexts/ArenaContext';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';
// Other imports as needed ...
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ArenaCards() {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState(null);
  const { arenaSessionId, arenaListName, arenaListNumber } = useContext(AppContext);
  const arenaEndPoint = 'items';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (arenaSessionId && arenaEndPoint) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenaget?endpoint=items`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId, arenaEndPoint]);

  return (
<div>
  {data ? (
    <Grid container spacing={3}>
      {data.results.map((item, index) => (
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3} key={item.guid}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
 
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">{item.revisionNumber}</Avatar>}
              action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}

              subheader={`Number: ${item.number}`}
            />
        <CardMedia
          component="img"
          height="140"
          image="assets/contemplative-reptile.jpeg"
          alt="green iguana"
        />
            <CardContent>
                {item.name}
                {item.description} 
                {item.assemblyType}
            </CardContent>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {/* You can add expanded content here if needed */}
              </CardContent>
            </Collapse>
            <Button size="small">Arena</Button>
        <Button size="small">Edit</Button>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <div>Loading some card data...</div>
  )}
</div>
  );
}

export default ArenaCards;
