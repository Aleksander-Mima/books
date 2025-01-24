import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'authors', label: 'Authors', minWidth: 170 },
  { id: 'publisher', label: 'Publisher', minWidth: 170 },
  { id: 'publishedDate', label: 'Published Date', minWidth: 170, align: 'right' },
  { id: 'cover', label: 'Cover', minWidth: 170, align: 'right' },
];

interface Data {
  title: string;
  authors: string;
  publisher: string;
  publishedDate: string;
  cover: JSX.Element; // For rendering book cover images
}

export default function StickyHeadTable({ bookmarks, setBookmarks }) {
  const [rows, setRows] = React.useState<Data[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=search+terms'
        );
        const data = await response.json();
        const books = data.items.map((item: any) => ({
          id: item.id, // Use ID for unique identification
          title: item.volumeInfo.title || 'N/A',
          authors: item.volumeInfo.authors?.join(', ') || 'Unknown',
          publisher: item.volumeInfo.publisher || 'Unknown',
          publishedDate: item.volumeInfo.publishedDate || 'N/A',
          cover: (
            <img
              src={item.volumeInfo.imageLinks?.thumbnail || ''}
              alt={item.volumeInfo.title}
              style={{ height: '50px' }}
            />
          ),
        }));
        setRows(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleToggleBookmark = (book) => {
    if (bookmarks.some((b) => b.id === book.id)) {
      setBookmarks(bookmarks.filter((b) => b.id !== book.id));
    } else {
      setBookmarks([...bookmarks, book]);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <h2>Lista e Librave</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Bookmark</TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      <button
                        onClick={() => handleToggleBookmark(row)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {bookmarks.some((b) => b.id === row.id) ? '⭐' : '☆'}
                      </button>
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id as keyof Data]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

