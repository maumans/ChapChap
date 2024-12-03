import React, { useState, useMemo } from 'react';
import AdminPanelLayout from '@/Layouts/AdminPanelLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Paper, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    IconButton,
    Tooltip,
    Box,
    Alert,
    Snackbar,
    Typography,
    Divider,
    Stack,
    FormHelperText
} from '@mui/material';
import { 
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    DragIndicator,
    Settings as SettingsIcon,
    Save as SaveIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';

const FIELD_TYPES = [
    { value: 'text', label: 'Texte', icon: '📝' },
    { value: 'number', label: 'Nombre', icon: '🔢' },
    { value: 'select', label: 'Sélection', icon: '📋' },
    { value: 'multiselect', label: 'Sélection multiple', icon: '📑' },
    { value: 'radio', label: 'Boutons radio', icon: '⭕' },
    { value: 'checkbox', label: 'Cases à cocher', icon: '☑️' },
    { value: 'date', label: 'Date', icon: '📅' },
    { value: 'textarea', label: 'Zone de texte', icon: '📄' }
];

function ChampForm({ champ, categories, onClose, isOpen }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nom: champ?.nom || '',
        label: champ?.label || '',
        type: champ?.type || 'text',
        placeholder: champ?.placeholder || '',
        description: champ?.description || '',
        options: champ?.options || [],
        ordre: champ?.ordre || 0,
        categories: champ?.categories?.map(c => c.id) || [],
        required: champ?.required || false
    });

    const [optionInput, setOptionInput] = useState({ label: '', value: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = champ
            ? put(route('admin.champs.update', champ.id))
            : post(route('admin.champs.store'));

        action.then(() => {
            setSnackbar({
                open: true,
                message: `Champ ${champ ? 'modifié' : 'créé'} avec succès`,
                severity: 'success'
            });
            onClose();
            reset();
        }).catch(() => {
            setSnackbar({
                open: true,
                message: 'Une erreur est survenue',
                severity: 'error'
            });
        });
    };

    const addOption = () => {
        if (optionInput.label && optionInput.value) {
            setData('options', [...data.options, optionInput]);
            setOptionInput({ label: '', value: '' });
        }
    };

    const removeOption = (index) => {
        const newOptions = [...data.options];
        newOptions.splice(index, 1);
        setData('options', newOptions);
    };

    const renderCategoryOptions = (categories, level = 0) => {
        return categories.map(category => (
            <React.Fragment key={category.id}>
                <MenuItem value={category.id} style={{ paddingLeft: `${level * 20}px` }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {level > 0 && <span>└</span>}
                        <span>{category.nom}</span>
                    </Stack>
                </MenuItem>
                {category.categories?.map(child => 
                    renderCategoryOptions([child], level + 1)
                )}
            </React.Fragment>
        ));
    };

    return (
        <>
            <Dialog 
                open={isOpen} 
                onClose={onClose} 
                maxWidth="md" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: 3
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <SettingsIcon color="primary" />
                        <Typography variant="h6">
                            {champ ? 'Modifier le champ' : 'Nouveau champ'}
                        </Typography>
                    </Stack>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <TextField
                                label="Nom"
                                value={data.nom}
                                onChange={e => setData('nom', e.target.value)}
                                error={!!errors.nom}
                                helperText={errors.nom}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Label"
                                value={data.label}
                                onChange={e => setData('label', e.target.value)}
                                error={!!errors.label}
                                helperText={errors.label}
                                fullWidth
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormControl fullWidth error={!!errors.type}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    label="Type"
                                    required
                                >
                                    {FIELD_TYPES.map(type => (
                                        <MenuItem key={type.value} value={type.value}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <span>{type.icon}</span>
                                                <span>{type.label}</span>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.type && (
                                    <FormHelperText>{errors.type}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth error={!!errors.categories}>
                                <InputLabel>Catégories</InputLabel>
                                <Select
                                    multiple
                                    value={data.categories}
                                    onChange={e => setData('categories', e.target.value)}
                                    label="Catégories"
                                    required
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => {
                                                const category = categories.find(c => c.id === value);
                                                return category ? (
                                                    <Chip 
                                                        key={value} 
                                                        label={category.nom}
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                ) : null;
                                            })}
                                        </Box>
                                    )}
                                >
                                    {renderCategoryOptions(categories)}
                                </Select>
                                {errors.categories && (
                                    <FormHelperText>{errors.categories}</FormHelperText>
                                )}
                            </FormControl>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <TextField
                                label="Placeholder"
                                value={data.placeholder}
                                onChange={e => setData('placeholder', e.target.value)}
                                fullWidth
                                error={!!errors.placeholder}
                                helperText={errors.placeholder}
                            />
                            <TextField
                                label="Description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                fullWidth
                                error={!!errors.description}
                                helperText={errors.description}
                                multiline
                                rows={1}
                            />
                        </div>

                        {['select', 'multiselect', 'radio', 'checkbox'].includes(data.type) && (
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Options du champ
                                </Typography>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <TextField
                                            label="Label de l'option"
                                            value={optionInput.label}
                                            onChange={e => setOptionInput({ ...optionInput, label: e.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Valeur"
                                            value={optionInput.value}
                                            onChange={e => setOptionInput({ ...optionInput, value: e.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                        <Button 
                                            onClick={addOption}
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            disabled={!optionInput.label || !optionInput.value}
                                        >
                                            Ajouter
                                        </Button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {data.options.map((option, index) => (
                                            <Chip
                                                key={index}
                                                label={`${option.label} (${option.value})`}
                                                onDelete={() => removeOption(index)}
                                                color="primary"
                                                variant="outlined"
                                                icon={<DragIndicator />}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Paper>
                        )}

                        <div className="flex justify-end gap-2 mt-4">
                            <Button 
                                onClick={onClose}
                                startIcon={<CancelIcon />}
                            >
                                Annuler
                            </Button>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                disabled={processing}
                                startIcon={<SaveIcon />}
                            >
                                {champ ? 'Mettre à jour' : 'Créer'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert 
                    onClose={() => setSnackbar({ ...snackbar, open: false })} 
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

function Index({ auth, champs, categories, errors: pageErrors }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedChamp, setSelectedChamp] = useState(null);
    const [isError, setIsError] = useState(!!pageErrors);
    const [confirmDelete, setConfirmDelete] = useState({ open: false, champId: null });
    
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);

    const [breadcrumbs] = useState([
        {
            id: 1,
            text: 'Admin',
            lien: 'admin.dashboard.index',
            id1: auth.user.id
        },
        {
            id: 2,
            text: 'Champs',
            lien: 'admin.champs.index',
            id1: auth.user.id,
            active: true
        },
    ]);

    const handleDelete = (id) => {
        setConfirmDelete({ open: false, champId: null });
        router.delete(route('admin.champs.destroy', { admin: auth.user.id, champ: id }));
    };

    const handleEdit = (champ) => {
        setSelectedChamp(champ);
        setOpenDialog(true);
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'label',
            header: 'Label',
            size: 200,
            Cell: ({ row }) => (
                <div className="font-medium">{row.original.label}</div>
            ),
        },
        {
            accessorKey: 'nom',
            header: 'Nom',
            size: 150,
        },
        {
            accessorKey: 'type',
            header: 'Type',
            size: 150,
            Cell: ({ row }) => {
                const type = FIELD_TYPES.find(t => t.value === row.original.type);
                return (
                    <div className="flex items-center gap-2">
                        <span>{type?.icon}</span>
                        <span>{type?.label || row.original.type}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'categories',
            header: 'Catégories',
            size: 300,
            Cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.categories.map(cat => (
                        <Chip
                            key={cat.id}
                            label={cat.nom}
                            size="small"
                            className="bg-green-50 text-green-700 border border-green-200"
                        />
                    ))}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 120,
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <Tooltip title="Modifier">
                        <IconButton
                            onClick={() => handleEdit(row.original)}
                            size="small"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                        <IconButton
                            onClick={() => setConfirmDelete({ 
                                open: true, 
                                champId: row.original.id 
                            })}
                            size="small"
                            className="text-red-600 hover:text-red-800"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ], []);

    return (
        <AdminPanelLayout auth={auth}>
            <Head title="Gestion des champs" />
            
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Gestion des champs
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Gérez les champs personnalisés pour vos catégories
                        </p>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedChamp(null);
                            setOpenDialog(true);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Nouveau champ
                    </Button>
                </div>

                <Paper elevation={0} className="overflow-hidden border border-gray-200">
                    <MaterialReactTable
                        columns={columns}
                        data={champs || []}
                        localization={MRT_Localization_FR}
                        initialState={{ 
                            showColumnFilters: true,
                            density: 'compact'
                        }}
                        manualPagination
                        manualFiltering
                        manualSorting
                        muiToolbarAlertBannerProps={
                            isError
                                ? {
                                    color: 'error',
                                    children: 'Erreur lors du chargement des données',
                                }
                                : undefined
                        }
                        onPaginationChange={setPagination}
                        onColumnFiltersChange={setColumnFilters}
                        onGlobalFilterChange={setGlobalFilter}
                        onSortingChange={setSorting}
                        rowCount={Array.isArray(champs) ? champs.length : 0}
                        state={{
                            pagination,
                            columnFilters,
                            globalFilter,
                            sorting,
                            isError,
                        }}
                        muiTablePaperProps={{
                            elevation: 0,
                            sx: {
                                borderRadius: '0.5rem',
                                border: '1px solid #e5e7eb',
                            },
                        }}
                        muiTableProps={{
                            sx: {
                                tableLayout: 'fixed',
                            },
                        }}
                        displayColumnDefOptions={{
                            'mrt-row-actions': {
                                size: 120,
                                muiTableHeadCellProps: {
                                    align: 'center',
                                },
                            },
                        }}
                    />
                </Paper>
            </div>

            <ChampForm
                champ={selectedChamp}
                categories={categories}
                isOpen={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedChamp(null);
                }}
            />

            <Dialog
                open={confirmDelete.open}
                onClose={() => setConfirmDelete({ open: false, champId: null })}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: 3
                    }
                }}
            >
                <DialogTitle>
                    <Typography variant="h6">
                        Confirmer la suppression
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Êtes-vous sûr de vouloir supprimer ce champ ? Cette action est irréversible.
                    </Typography>
                </DialogContent>
                <div className="flex justify-end gap-2 p-4">
                    <Button
                        onClick={() => setConfirmDelete({ open: false, champId: null })}
                        startIcon={<CancelIcon />}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={() => handleDelete(confirmDelete.champId)}
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Supprimer
                    </Button>
                </div>
            </Dialog>
        </AdminPanelLayout>
    );
}

export default Index;
