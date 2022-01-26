import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import React from "react";
import { useAppDispatch } from "../../store/hooks/storeHooks";
import { logout } from "../../store/slices/authSlice";
import { RightMenu, StyledHeader, Title } from "../styled/Header";
import { Flex } from "../styled/Flex";

const settings = ["Logout"];
const LOGO = "PROJECT MANAGEMENT";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event?.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <StyledHeader>
      <Flex>
        <Title>{LOGO}</Title>
        <RightMenu>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleLogout}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </RightMenu>
      </Flex>
    </StyledHeader>
  );
};
export default Navbar;
