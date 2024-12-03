import React, { useMemo, useState, useEffect } from 'react';
import { Breadcrumbs, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { Edit, Delete, ViewColumn, Add as AddIcon, ViewList as ViewListIcon } from '@mui/icons-material';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout.jsx";
import { Link, router, usePage, useForm } from "@inertiajs/react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function CategoryForm({ isOpen, onClose, editingCategory = null, categories }) {
    const { data, setData, post, put, processing, errors } = useForm({
        nom: editingCategory?.nom || '',
        description: editingCategory?.description || '',
        parent_id: editingCategory?.parent_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('admin.categorie.update', editingCategory.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            post(route('admin.categorie.store'), {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <TextField
                        fullWidth
                        label="Nom"
                        value={data.nom}
                        onChange={e => setData('nom', e.target.value)}
                        error={!!errors.nom}
                        helperText={errors.nom}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Catégorie parente</InputLabel>
                        <Select
                            value={data.parent_id}
                            onChange={e => setData('parent_id', e.target.value)}
                            label="Catégorie parente"
                        >
                            <MenuItem value="">Aucune</MenuItem>
                            {categories.data.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.nom}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button onClick={onClose}>Annuler</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={processing}
                        >
                            {editingCategory ? 'Modifier' : 'Créer'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function Index({ auth, categories, success, errors }) {
    const [isError, setIsError] = useState(!!errors);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [viewMode, setViewMode] = useState('table'); // 'table' ou 'tree'
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [breadcrumbs] = useState([
        {
            id: 1,
            text: 'Admin',
            lien: 'admin.dashboard.index',
            id1: auth.user.id
        },
        {
            id: 2,
            text: 'Catégories',
            lien: 'admin.categorie.index',
            id1: auth.user.id,
            active: true
        },
    ]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'nom',
                header: 'Nom',
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        {row.original.icon && (
                            <span className="material-icons text-gray-600">
                                {row.original.icon}
                            </span>
                        )}
                        <span>{row.original.nom}</span>
                    </div>
                ),
            },
            {
                accessorKey: 'parent',
                header: 'Catégorie parente',
                Cell: ({ row }) => row.original.parent?.nom || '-',
            },
            {
                accessorKey: 'champs_count',
                header: 'Nombre de champs',
                Cell: ({ row }) => (
                    <Chip 
                        label={row.original.champs?.length || 0}
                        color="primary"
                        size="small"
                    />
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <IconButton
                            size="small"
                            onClick={() => handleEdit(row.original)}
                            className="text-blue-600"
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(row.original.id)}
                            className="text-red-600"
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                        <Link
                            href={route('admin.categorie.champsManagement', {
                                admin: auth.user.id,
                                categorie: row.original.id
                            })}
                            className="inline-flex items-center p-1 rounded-full hover:bg-gray-100"
                        >
                            <ViewColumn className="text-green-600" fontSize="small" />
                        </Link>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: categories.data || [],
        localization: MRT_Localization_FR,
        initialState: { showColumnFilters: true },
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Erreur lors du chargement des données',
            }
            : undefined,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        rowCount: categories.total || 0,
        state: {
            pagination,
            columnFilters,
            globalFilter,
            sorting,
            isError,
        },
        renderTopToolbarCustomActions: () => (
            <div className="flex gap-2">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setEditingCategory(null);
                        setIsFormOpen(true);
                    }}
                >
                    Nouvelle catégorie
                </Button>
                <IconButton
                    onClick={() => setViewMode(viewMode === 'table' ? 'tree' : 'table')}
                    className="ml-2"
                >
                    {viewMode === 'table' ? <ViewListIcon /> : <ViewColumn />}
                </IconButton>
            </div>
        ),
    });

    const renderTree = (categories) => {
        return categories.map(category => (
            <TreeItem
                key={category.id}
                nodeId={category.id.toString()}
                label={
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            {category.icon && (
                                <span className="material-icons text-gray-600">
                                    {category.icon}
                                </span>
                            )}
                            <span>{category.nom}</span>
                            {category.champs?.length > 0 && (
                                <Chip 
                                    label={`${category.champs.length} champs`}
                                    size="small"
                                    className="ml-2"
                                />
                            )}
                        </div>
                        <div className="flex gap-2">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(category);
                                }}
                                className="text-blue-600"
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(category.id);
                                }}
                                className="text-red-600"
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                            <Link
                                href={route('admin.categorie.champsManagement', {
                                    admin: auth.user.id,
                                    categorie: category.id
                                })}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center p-1 rounded-full hover:bg-gray-100"
                            >
                                <ViewColumn className="text-green-600" fontSize="small" />
                            </Link>
                        </div>
                    </div>
                }
            >
                {category.children?.length > 0 && renderTree(category.children)}
            </TreeItem>
        ));
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsFormOpen(true);
    };

    const handleDelete = (categoryId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            router.delete(route('admin.categorie.destroy', categoryId));
        }
    };

    return (
        <AdminPanelLayout auth={auth}>
            <div className="p-6">
                <div className="mb-6">
                    <Breadcrumbs aria-label="breadcrumb" separator="/">
                        {breadcrumbs.map(({ id, text, lien, id1, active }) => (
                            <Link
                                key={id}
                                href={route(lien, id1)}
                                className={`${
                                    active ? 'text-green-500' : 'text-gray-500'
                                } hover:text-green-700`}
                            >
                                {text}
                            </Link>
                        ))}
                    </Breadcrumbs>
                </div>

                {viewMode === 'table' ? (
                    <MaterialReactTable table={table} />
                ) : (
                    <div className="bg-white rounded-lg shadow p-6">
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            className="w-full"
                        >
                            {renderTree(categories)}
                        </TreeView>
                    </div>
                )}
            </div>

            <CategoryForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                editingCategory={editingCategory}
                categories={categories}
            />
        </AdminPanelLayout>
    );
}

export default Index;
