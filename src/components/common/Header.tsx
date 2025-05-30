import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/StateContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [{ basket }] = useStateContext();
    return (
        <div className="header">
            <div className="container">
                <div className="header__container">
                    <Link to="/">
                        <div className="header__logo">
                            <StorefrontIcon className='header__logoImage' fontSize="large" />
                            <h2 className="header__logoTitle">eShop</h2>
                        </div>
                    </Link>
                    <div className="header__search">
                        <input type="text" className="header__searchInput" id="" placeholder="Search products..." />
                        <SearchIcon className="header__searchIcon" />
                    </div>
                    <button
                        className="header__menuButton sm:hidden absolute right-4 top-3"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <MenuIcon fontSize="large" />
                    </button>
                    <div className="header__nav">
                        <Link to="/login">
                            <div className="nav__item">
                                <span className="nav__itemListOne">Hello Guest</span>
                                <span className="nav__itemListTwo">Sign In</span>
                            </div>
                        </Link>
                        <Link to="/checkout">
                            <div className="nav__item">
                                <ShoppingBasketIcon className='itemBasket' />
                                <span className="nav__itemListTwo nav__basketCount">{basket?.length}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="header__mobileMenuOverlay" onClick={() => setIsMenuOpen(false)} />
            )}
            <div
                className={`header__mobileMenu ${isMenuOpen ? 'header__mobileMenuOpen' : 'header__mobileMenuClosed'}`}
            >
                <div className="p-4 space-y-4">
                    <div className="header__mobileMenuHeader">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            <div className="flex items-center space-x-2">
                                <StorefrontIcon className="text-[#ff9f00]" fontSize="large" />
                                <h2 className="text-white font-bold">eShop</h2>
                            </div>
                        </Link>
                        <button
                            className="header__mobileMenuCloseButton"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <CloseIcon fontSize="large" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link to="/login"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="header__mobileMenuItem">
                                <span className="header__mobileMenuItemSubtext">Hello Guest</span>
                                <span className="header__mobileMenuItemText">Sign In</span>
                            </div>
                        </Link>
                        <div className="header__mobileMenuItem">
                            <span className="header__mobileMenuItemSubtext">Your</span>
                            <span className="header__mobileMenuItemText">Shop</span>
                        </div>
                        <Link to="/checkout"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="header__mobileMenuCart">
                                <ShoppingBasketIcon className='header__mobileMenuCartIcon' />
                                <span className="header__mobileMenuItemText">Cart</span>
                                <span className="header__mobileMenuCartCount">{basket.length}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
