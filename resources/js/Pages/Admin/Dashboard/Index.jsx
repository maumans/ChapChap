import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
} from 'chart.js';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

function Index({ auth }) {
    // Données du graphique (Line chart - Ventes)
    const salesChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Ventes propres',
                data: [33, 53, 85, 41, 44, 65, 92],
                borderColor: '#10B981',
                backgroundColor: '#10B98133',
                fill: true,
                tension: 0.3,
            },
            {
                label: 'Ventes des vendeurs indépendants',
                data: [28, 48, 70, 38, 41, 60, 85],
                borderColor: '#3B82F6',
                backgroundColor: '#3B82F633',
                fill: true,
                tension: 0.3,
            },
        ],
    };

    // Données du graphique (Bar chart - Catégories de produits)
    const productCategoriesData = {
        labels: ['Electronics', 'Fashion', 'Home & Garden', 'Toys', 'Books'],
        datasets: [
            {
                label: 'Propre stock',
                data: [200, 450, 300, 220, 500],
                backgroundColor: '#10B981',
            },
            {
                label: 'Stock des vendeurs indépendants',
                data: [180, 400, 280, 200, 450],
                backgroundColor: '#3B82F6',
            },
        ],
    };

    // Données du graphique (Pie chart - Répartition des utilisateurs)
    const userDistributionData = {
        labels: ['Acheteurs', 'Vendeurs indépendants', 'Administrateurs'],
        datasets: [
            {
                label: 'Utilisateurs',
                data: [1200, 280, 20],
                backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
            },
        ],
    };

    // Données du graphique (Doughnut chart - Répartition des annonces)
    const adDistributionData = {
        labels: ['Actives', 'En attente', 'Expirées'],
        datasets: [
            {
                label: 'Annonces',
                data: [500, 150, 100],
                backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
            },
        ],
    };

    // Données pour le tableau des meilleures ventes
    const topSellingProducts = [
        { name: 'Smartphone XYZ', category: 'Electronics', sales: 120, stock: 50 },
        { name: 'T-shirt Fashion', category: 'Fashion', sales: 95, stock: 200 },
        { name: 'Smart TV 55"', category: 'Electronics', sales: 80, stock: 30 },
        { name: 'Garden Tools Set', category: 'Home & Garden', sales: 75, stock: 60 },
        { name: 'Best-selling Novel', category: 'Books', sales: 70, stock: 100 },
    ];

    return (
        <AdminPanelLayout auth={auth}>
            <div className="p-6">
                <div className={"bg-green-500 mb-6 rounded p-1"}>
                    <Typography variant="h5" className="text-white">Tableau de bord</Typography>
                </div>

                {/* Cartes d'information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                    <Card className="shadow-lg">
                        <CardContent className="flex justify-between items-center">
                            <div>
                                <Typography variant="h5" className="text-green-500">1500</Typography>
                                <Typography color="textSecondary">Utilisateurs totaux</Typography>
                            </div>
                            <PeopleIcon className="text-green-500" fontSize="large" />
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardContent className="flex justify-between items-center">
                            <div>
                                <Typography variant="h5" className="text-green-500">3000</Typography>
                                <Typography color="textSecondary">Commandes totales</Typography>
                            </div>
                            <ShoppingCartIcon className="text-green-500" fontSize="large" />
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardContent className="flex justify-between items-center">
                            <div>
                                <Typography variant="h5" className="text-green-500">2500</Typography>
                                <Typography color="textSecondary">Produits en stock</Typography>
                            </div>
                            <InventoryIcon className="text-green-500" fontSize="large" />
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardContent className="flex justify-between items-center">
                            <div>
                                <Typography variant="h5" className="text-green-500">280</Typography>
                                <Typography color="textSecondary">Vendeurs indépendants</Typography>
                            </div>
                            <StorefrontIcon className="text-green-500" fontSize="large" />
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardContent className="flex justify-between items-center">
                            <div>
                                <Typography variant="h5" className="text-green-500">750</Typography>
                                <Typography color="textSecondary">Annonces actives</Typography>
                            </div>
                            <AnnouncementIcon className="text-green-500" fontSize="large" />
                        </CardContent>
                    </Card>
                </div>

                {/* Grille pour les graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="shadow-lg p-4 bg-white rounded-lg">
                        <Typography variant="h6" className="text-green-500 mb-2">Évolution des ventes</Typography>
                        <Line data={salesChartData} />
                    </div>

                    <div className="shadow-lg p-4 bg-white rounded-lg">
                        <Typography variant="h6" className="text-green-500 mb-2">Catégories de produits</Typography>
                        <Bar data={productCategoriesData} />
                    </div>

                    <div className="shadow-lg p-4 bg-white rounded-lg">
                        <Typography variant="h6" className="text-green-500 mb-2">Répartition des utilisateurs</Typography>
                        <Pie data={userDistributionData} />
                    </div>

                    <div className="shadow-lg p-4 bg-white rounded-lg">
                        <Typography variant="h6" className="text-green-500 mb-2">État des annonces</Typography>
                        <Doughnut data={adDistributionData} />
                    </div>
                </div>

                {/* Tableau des meilleures ventes */}
                <div className="shadow-lg p-4 bg-white rounded-lg">
                    <Typography variant="h6" className="text-green-500 mb-2">Top 5 des produits les plus vendus</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom du produit</TableCell>
                                    <TableCell>Catégorie</TableCell>
                                    <TableCell align="right">Ventes</TableCell>
                                    <TableCell align="right">Stock disponible</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {topSellingProducts.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell align="right">{product.sales}</TableCell>
                                        <TableCell align="right">{product.stock}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </AdminPanelLayout>
    );
}

export default Index;
