import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'staff account',
    path: '/dashboard/staffaccount',
    icon: <Face5OutlinedIcon />,
  },
  {
    title: 'staff infomation',
    path: '/dashboard/staffinfo',
    icon: <FolderSharedOutlinedIcon />,
  },
  {
    title: 'customer account',
    path: '/dashboard/customeraccount',
    icon: <AccountCircleOutlinedIcon />,
  },
  {
    title: 'customer information',
    path: '/dashboard/customerinfo',
    icon: <PermIdentityOutlinedIcon />,
  },
  {
    title: 'catergories',
    path: '/dashboard/categories',
    icon: <ListOutlinedIcon />,
  },
  {
    title: 'drinks information',
    path: '/dashboard/drinksinfo',
    icon: <LocalCafeOutlinedIcon />,
  },
  {
    title: 'drinks price',
    path: '/dashboard/drinksprice',
    icon: <PriceChangeOutlinedIcon />,
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    title: 'orders detail ',
    path: '/dashboard/ordersdetail',
    icon: <ShoppingCartCheckoutOutlinedIcon />,
  },
  {
    title: 'statistic',
    path: '/dashboard/statistic',
    icon: <AddchartOutlinedIcon />,
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
