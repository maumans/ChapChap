import React, { useMemo, useState, useEffect } from 'react';
import {Breadcrumbs, Button, IconButton} from '@mui/material';
import { Edit, Delete, ViewColumn } from '@mui/icons-material';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout.jsx";

import {Link, router, usePage} from "@inertiajs/react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import { MRT_Localization_FR } from 'material-react-table/locales/fr';


function Index({ auth,categories,success,errors }) {
    const [breadcrumbs,setBreadcrumbs]=useState([
        {
            id: 1,
            text: 'Admin',
            lien: 'admin.dashboard.index',
            id1:auth.user.id
        },
        {
            id: 2,
            text: 'Catégorie',
            lien: 'admin.categorie.index',
            id1:auth.user.id,
            active: true
        },
    ])

    //table state
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex:categories.current_page-1,
        pageSize:categories.per_page,
    });
    const [loading, setLoading] = useState(false);
    const totalRowCount = categories.total || 0; // Nombre total de lignes

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);


    useEffect(() => {
        // Actualiser les données des catégories via router
        setLoading(true);
        router.get(route('admin.categorie.index',auth.user.id),
            {
                'start': pagination.pageIndex * pagination.pageSize,
                "size": pagination.pageSize,
                'filters': (columnFilters??[]).reduce((acc,item)=> {
                    acc[item.id] = item.value;
                    return acc;
                },{}),
                'globalFilter': globalFilter ?? '',
                'sorting': sorting ?? []
            },{
                preserveScroll:true,preserveState:true
            })
    },[
        pagination.pageIndex,
        pagination.pageSize,
        globalFilter,
        columnFilters,
        sorting
    ])

    // Définir les colonnes du tableau
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'nom',
            header: 'Nom',
            size: 200,
        },
        {
            accessorKey: 'status',
            header: 'Statut',
            Cell: ({ row }) => (
                <span className={`px-2 py-1 rounded-full ${row.original.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {row.original.status ? 'Actif' : 'Inactif'}
                </span>
            ),
        },
        {
            accessorKey: 'champs',
            header: 'Champs associés',
            size: 250,
            Cell: ({ row }) => (
                <div className="space-y-2">
                    {row.original.champs && row.original.champs.length > 0 ? (
                        row.original.champs.map((champ, index) => (
                            <span
                                key={champ.id}
                                className="px-2 py-1 bg-gray-200 rounded-md text-sm text-gray-800 inline-block"
                            >
                                {champ.nom} (ordre: {champ.pivot.ordre})
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-500">Aucun champ associé</span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            Cell: ({ row }) => (
                <>
                    <IconButton
                        onClick={() => handleEdit(row.original.id)}
                        color="primary"
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(row.original.id)}
                        color="secondary"
                    >
                        <Delete />
                    </IconButton>
                    <IconButton
                        onClick={() => handleViewChamps(row.original.id)}
                        color="info"
                    >
                        <ViewColumn />
                    </IconButton>
                </>
            ),
        },
    ], []);

    const table = useMaterialReactTable({
        columns,
        data:categories.data,
        //enableRowSelection: true,
        getRowId: (row) => row.id,
        initialState: { showColumnFilters: false },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Erreur de chargement des données',
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount:categories.total,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
        localization: MRT_Localization_FR,
        renderTopToolbarCustomActions:() => (
            <Button
                variant="contained"
                color="primary"
                onClick={() => router.visit('/admin/categories/create')}
            >
                Ajouter une catégorie
            </Button>
        )
    })


    const handleEdit = (id) => {
        router.visit(route('admin.categorie.edit',[auth.user.id,id]));
    };

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
            router.delete(route('admin.categorie.delete',[auth.user.id,id]), {
                onSuccess: () => {
                    router.get(route('admin.categorie.index',auth.user.id), {
                        page: pageIndex + 1,
                        pageSize,
                        filter: globalFilter,
                    }, {
                        preserveState: true,
                        replace: true,
                    });
                },
            });
        }
    };

    const handleViewChamps = (categorieId) => {
        router.get(route('admin.categorie.champsManagement',[auth.user.id,categorieId]), {

        });
    };


    return (
        <AdminPanelLayout auth={auth}>
            <div className={"grid gap-5"}>
                <Breadcrumbs aria-label="breadcrumb" separator={"/"}>
                    {
                        breadcrumbs.map(({id,id1,text,lien,href,active,icon}) =>(
                            <Link href={route(lien,id1)} key={id} color={'text.primary'} underline="hover" aria-current="page">
                                {/*{
                                    icon && icon
                                }*/}
                                <span className={active?'text-green-500 text-sm':'text-sm text-black'}>
                                    {text}
                                </span>
                            </Link>
                        ))
                    }
                </Breadcrumbs>
                <MaterialReactTable table={table}/>
            </div>
        </AdminPanelLayout>
    );
}

export default Index;
