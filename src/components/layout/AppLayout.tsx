import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined'
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined'
import SportsOutlined from '@mui/icons-material/SportsOutlined'
import QuizOutlined from '@mui/icons-material/QuizOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import BrandMark from '../BrandMark'

const DRAWER_WIDTH = 268

const navItems: {
  label: string
  path: string
  icon: ReactNode
  children?: { label: string; path: string; icon: ReactNode }[]
}[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlined /> },
  { label: 'Eligibility Status', path: '/eligibility', icon: <FactCheckOutlined /> },
  { label: 'Core Courses', path: '/courses', icon: <MenuBookOutlined /> },
  { label: 'NCAA ID & Test Scores', path: '/test-scores', icon: <QuizOutlined /> },
  {
    label: 'Recruiting',
    path: '/recruiting',
    icon: <SportsOutlined />,
    children: [
      { label: 'Calendar', path: '/recruiting/calendar', icon: <CalendarMonthOutlined /> },
      { label: 'Coach Search', path: '/coaches', icon: <SearchOutlined /> },
    ],
  },
  { label: 'Training Library', path: '/training', icon: <LibraryBooksOutlined /> },
]

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const student = useAppSelector((state) => state.student.current)

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 2 }}>
        <BrandMark compact />
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.25, py: 1.5, flex: 1 }}>
        {navItems.map((item) => {
          const childActive = item.children?.some((child) => location.pathname === child.path)
          const selected =
            item.path === '/recruiting'
              ? location.pathname === '/recruiting' ||
                (location.pathname.startsWith('/recruiting/') && !childActive)
              : location.pathname === item.path
          return (
            <Box key={item.path}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={Boolean(item.children)}
                selected={selected}
                onClick={() => setMobileOpen(false)}
                sx={{
                  mb: 0.5,
                  borderRadius: 1.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': { color: 'inherit' },
                    '&:hover': { bgcolor: 'primary.dark' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
              {item.children?.map((child) => (
                <ListItemButton
                  key={child.path}
                  component={NavLink}
                  to={child.path}
                  selected={location.pathname === child.path}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    mb: 0.5,
                    ml: 3,
                    py: 0.75,
                    minHeight: 36,
                    borderRadius: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': { color: 'inherit' },
                      '&:hover': { bgcolor: 'primary.dark' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>{child.icon}</ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    slotProps={{ primary: { variant: 'body2' } }}
                  />
                </ListItemButton>
              ))}
            </Box>
          )
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>
          {student.firstName} {student.lastName}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {student.school.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user?.email}
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            bgcolor: '#E6EEFF',
            px: 3,
            py: 0.75,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
            Recruiting preparation begins in the freshman year — just like it did for
            this star football champion.
          </Typography>
        </Box>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" color="primary" sx={{ flexGrow: 1 }}>
            3 Step Recruiting Process
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              dispatch(logout())
              navigate('/login')
            }}
            aria-label="Sign out"
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ height: { xs: 0, sm: 36 } }} />
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
