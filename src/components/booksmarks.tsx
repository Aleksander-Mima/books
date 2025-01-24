
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MediaControlCard({ bookmarks }) {
    return (
      <>
        <h2>Librat e preferuar</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {bookmarks.map((book) => (
            <Card sx={{ maxWidth: 345 }} key={book.id}>
              <CardActionArea>
                {book.cover}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.authors}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </>
    );
  }
  