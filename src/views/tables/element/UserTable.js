import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress
} from "@mui/material";

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
const UserTable = ({ users,loading }) => {
  ;

  

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (users == null || !users) {
    return (
      <TableHead>
        <TableRow>
          <TableCell >
            <Typography>Data Kosong</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  } else {
    return (
      <Box
        sx={{
           wordWrap: 'break-word', 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
          overflowX: "auto",
          maxWidth: "100%", 
        }}
      >
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Nama
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              email
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography color="textSecondary" variant="h6">
              Tanggal Lahir
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography color="textSecondary" variant="h6">
              No HP
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography color="textSecondary" variant="h6">
              Nama Kampus
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography color="textSecondary" variant="h6">
              Alamat
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography color="textSecondary" variant="h6">
              Kota
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((User,index) => (
          <TableRow key={User.email}>
            <TableCell>
              <Box
                sx={{
                  wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {User.full_name}
                  </Typography>
                 
                </Box>
              </Box>
            </TableCell>
            <TableCell>
             <Typography
                    variant="p"
                    sx={{
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                      fontWeight: "400",
                    }}
                  >
                    {User.email}
                  </Typography>
              </TableCell>

            <TableCell>
            <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                     {new Date(User.birthDate).getDate()} {months[new Date(User.birthDate).getMonth()]} {new Date(User.birthDate).getFullYear()}
                  </Typography>
            </TableCell>
            <TableCell >
              <Typography variant="h6">
               {User.phoneNumber}
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {User.address}
                  </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">
               {User.campus_name}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">
               {User.city}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
  );
}
};

export default UserTable;
