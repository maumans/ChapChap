import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "@inertiajs/react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Importation des icônes (comme précédemment)
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpIcon from '@mui/icons-material/Help';
import SecurityIcon from '@mui/icons-material/Security';
import {createTheme, ThemeProvider} from "@mui/material";
import {frFR} from "@mui/material/locale";

function AdminPanelLayout({ auth, children }) {

    const theme = createTheme(
        {
            typography: {
                "fontFamily": `"BioRhyme", sans-serif`,
                "fontSize": 14,
                "fontWeightLight": 300,
                "fontWeightRegular": 400,
                "fontWeightMedium": 500
            },
            palette: {
                primary: {main: '#22C55E'},
            },
        },
        frFR
    );


    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsSidebarCollapsed(false);
            }
            else
            {
                setIsSidebarCollapsed(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="flex h-screen bg-white">
                {/* Sidebar */}
                <Sidebar
                    collapsed={isSidebarCollapsed}
                    className={`h-screen ${isMobile ? 'absolute z-10' : 'relative'} ${
                        isMobile && isSidebarCollapsed ? 'hidden' : ''
                    }`}
                    width="280px"
                    collapsedWidth="px"
                    style={{
                        overflowY: 'auto',
                        height: '100vh',
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'white',
                    }}
                >
                    <div className="p-4 border-b flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-green-500">
                            ChapChap
                        </Link>
                        {isMobile && (
                            <button onClick={toggleSidebar} className="text-gray-500">
                                <CloseIcon />
                            </button>
                        )}
                    </div>
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active }) => {
                                return {
                                    color: active ? '#10B981' : "#10B981",
                                    backgroundColor: active ? '#ffffff' : "#ffffff",
                                };
                            },
                        }}
                    >
                        <MenuItem icon={<DashboardIcon />} component={<Link href="/admin/dashboard" />}>
                            Tableau de bord
                        </MenuItem>

                        <SubMenu label="Gestion des produits" icon={<InventoryIcon />}>
                            <MenuItem component={<Link href="/admin/products" />}>Liste des produits</MenuItem>
                            <MenuItem component={<Link href="/admin/products/create" />}>Ajouter un produit</MenuItem>
                            <MenuItem component={<Link href="/admin/products/categories" />}>Catégories de produits</MenuItem>
                            <MenuItem component={<Link href="/admin/products/inventory" />}>Gestion du stock</MenuItem>
                        </SubMenu>

                        <SubMenu label="Gestion des annonces" icon={<AnnouncementIcon />}>
                            <MenuItem component={<Link href={route('admin.annonce.index', auth.user.id)} />}>
                                Liste des annonces
                            </MenuItem>
                            <MenuItem component={<Link href={route('admin.annonce.create', auth.user.id)} />}>
                                Ajouter une annonce
                            </MenuItem>
                            <SubMenu label="Configuration">
                                <MenuItem component={<Link href={route('admin.categorie.index', auth.user.id)} />}>
                                    Catégories
                                </MenuItem>
                                <MenuItem component={<Link href={route('admin.champs.index', {admin: auth.user.id})} />}>
                                    Champs personnalisés
                                </MenuItem>
                            </SubMenu>
                            <MenuItem component={<Link href="/admin/ads/moderation" />}>
                                Modération
                            </MenuItem>
                            <MenuItem component={<Link href="/admin/ads/reports" />}>
                                Signalements
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Vendeurs" icon={<StorefrontIcon />}>
                            <MenuItem component={<Link href="/admin/sellers" />}>Liste des vendeurs</MenuItem>
                            <MenuItem component={<Link href="/admin/sellers/applications" />}>Demandes de vendeurs</MenuItem>
                            <MenuItem component={<Link href="/admin/sellers/performance" />}>Performance des vendeurs</MenuItem>
                        </SubMenu>

                        <SubMenu label="Commandes" icon={<ShoppingCartIcon />}>
                            <MenuItem component={<Link href="/admin/orders" />}>Liste des commandes</MenuItem>
                            <MenuItem component={<Link href="/admin/orders/pending" />}>Commandes en attente</MenuItem>
                            <MenuItem component={<Link href="/admin/orders/shipped" />}>Commandes expédiées</MenuItem>
                            <MenuItem component={<Link href="/admin/orders/returns" />}>Retours et remboursements</MenuItem>
                        </SubMenu>

                        <SubMenu label="Utilisateurs" icon={<PeopleIcon />}>
                            <MenuItem component={<Link href="/admin/users" />}>Liste des utilisateurs</MenuItem>
                            <MenuItem component={<Link href="/admin/users/roles" />}>Rôles et permissions</MenuItem>
                        </SubMenu>

                        <SubMenu label="Paiements" icon={<AttachMoneyIcon />}>
                            <MenuItem component={<Link href="/admin/payments" />}>Transactions</MenuItem>
                            <MenuItem component={<Link href="/admin/payments/methods" />}>Méthodes de paiement</MenuItem>
                            <MenuItem component={<Link href="/admin/payments/payouts" />}>Versements aux vendeurs</MenuItem>
                        </SubMenu>

                        <SubMenu label="Livraison" icon={<LocalShippingIcon />}>
                            <MenuItem component={<Link href="/admin/shipping/methods" />}>Méthodes de livraison</MenuItem>
                            <MenuItem component={<Link href="/admin/shipping/zones" />}>Zones de livraison</MenuItem>
                            <MenuItem component={<Link href="/admin/shipping/tracking" />}>Suivi des colis</MenuItem>
                        </SubMenu>

                        <SubMenu label="Rapports et analyses" icon={<BarChartIcon />}>
                            <MenuItem component={<Link href="/admin/reports/sales" />}>Rapport des ventes</MenuItem>
                            <MenuItem component={<Link href="/admin/reports/products" />}>Rapport des produits</MenuItem>
                            <MenuItem component={<Link href="/admin/reports/customers" />}>Rapport des clients</MenuItem>
                        </SubMenu>

                        <SubMenu label="Support client" icon={<FeedbackIcon />}>
                            <MenuItem component={<Link href="/admin/support/tickets" />}>Tickets de support</MenuItem>
                            <MenuItem component={<Link href="/admin/support/faq" />}>Gestion de la FAQ</MenuItem>
                        </SubMenu>

                        <SubMenu label="Paramètres" icon={<SettingsIcon />}>
                            <MenuItem component={<Link href="/admin/settings/general" />}>Paramètres généraux</MenuItem>
                            <MenuItem component={<Link href="/admin/settings/appearance" />}>Apparence du site</MenuItem>
                            <MenuItem component={<Link href="/admin/settings/emails" />}>Modèles d'emails</MenuItem>
                            <MenuItem component={<Link href="/admin/settings/integrations" />}>Intégrations</MenuItem>
                        </SubMenu>

                        <MenuItem icon={<SecurityIcon />} component={<Link href="/admin/security" />}>
                            Sécurité et conformité
                        </MenuItem>

                        <MenuItem icon={<HelpIcon />} component={<Link href="/admin/help" />}>
                            Aide et documentation
                        </MenuItem>

                    </Menu>
                </Sidebar>

                {/* Main content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top bar */}
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            {isMobile && (
                                <button onClick={toggleSidebar} className="text-gray-500">
                                    <MenuIcon />
                                </button>
                            )}
                            <h1 className="text-xl font-semibold text-green-500">Administration</h1>
                            {/* Add user menu or other top bar items here */}
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 bg-white">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </ThemeProvider>

    );
}

export default AdminPanelLayout;
