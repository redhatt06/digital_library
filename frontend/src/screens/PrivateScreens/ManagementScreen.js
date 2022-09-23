import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';

import '../../App.css';
import { useNavigate } from 'react-router-dom';

//Screen for navigating to different managament pages, private to only authorized users
export default function ManagamentScreen(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-flex">
        <h1>Library Managament</h1>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'background.paper',
            minWidth: '30rem',
          }}
        >
          <List
            sx={{
              minWidth: '30rem',
              textAlign: 'center',
            }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/addbook')}>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: '2rem',
                    color: 'secondary',
                  }}
                  sx={{ textAlign: 'center' }}
                  primary="Add book"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: '2rem',
                    color: 'secondary',
                  }}
                  sx={{ textAlign: 'center' }}
                  onClick={() => navigate('/managebooks')}
                  primary="Manage books"
                />
              </ListItemButton>
            </ListItem>
            <ListItem color="secondary" disablePadding>
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: '2rem',
                    color: 'secondary',
                  }}
                  sx={{ textAlign: 'center' }}
                  onClick={() => navigate('/manageauthors')}
                  primary="Manage Authors"
                />
              </ListItemButton>
            </ListItem>
            <ListItem color="secondary" disablePadding>
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: '2rem',
                    color: 'secondary',
                  }}
                  sx={{ textAlign: 'center' }}
                  onClick={() => navigate('/searchBookById')}
                  primary="Search Book by ID"
                />
              </ListItemButton>
            </ListItem>
            <ListItem color="secondary" disablePadding>
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: '2rem',
                    color: 'secondary',
                  }}
                  sx={{ textAlign: 'center' }}
                  onClick={() => navigate('/searchAuthorById')}
                  primary="Search Author by ID"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </div>
    </>
  );
}
