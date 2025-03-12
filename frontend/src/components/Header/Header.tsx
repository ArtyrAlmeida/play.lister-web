import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { AuthResponse } from '../../interfaces/auth.types';

import styles from "./Header.module.scss";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { findUser } from '../../api/user';
import Loading from '../Loading/Loading';
import NoContent from '../NoContent/NoContent';
import { Close } from '@mui/icons-material';

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const { id } = useAuthUser<AuthResponse>()!
  const navigate = useNavigate();
  const signOut = useSignOut()

  const { data, isLoading, error } = useQuery({
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
    queryKey: [`user-${id}`, id],
    queryFn: async () => {
        return await findUser(id)
    }
});

  const handleLogout = () => {
    signOut();
    navigate("/login")
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  
  const handleNavigate = (route: string) => () => {
    navigate(route);
    navigate(0);
  }

  const DrawerList = (
    <Box onClick={toggleDrawer(false)}>
      <List>
      <ListItem disablePadding>
          <ListItemButton onClick={handleNavigate("/")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Início"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleNavigate("/profile/")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleNavigate("/playlist/create")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Criar Playlist"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleNavigate("/about")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Sobre Nós"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  if (isLoading) return <div><Loading message="Carregando Header"/></div>
  if (error || (!isLoading && !data)) return <NoContent icon={<Close />} message="Erro ao obter header"  />

  return (
    <>
      <div className={styles.header}>
        <div className={styles.user} onClick={toggleDrawer(true)}>
          <p>{data?.name}</p>
          <img src={data?.image} className={""} />
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default Header;