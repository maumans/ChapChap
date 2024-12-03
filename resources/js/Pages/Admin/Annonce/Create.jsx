import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    IconButton, InputAdornment,
    TextField,
} from "@mui/material";
import {Link, router, useForm} from "@inertiajs/react";
import {Add, AddOutlined, Close, Favorite, InputOutlined, Label, Place, Visibility} from "@mui/icons-material";
import {VisuallyHiddenInput} from "@/Components/VisuallyHiddenInput.jsx";
import Dialog from '@mui/material/Dialog';
import RenderChamp from "@/Components/RenderChamp.jsx";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout.jsx";

function Create({auth,categories,categoriesGroup,devises}) {

    const { data, setData, post, errors } = useForm({
        titre: '',
        prix: '',
        devise_id: '',
        description: '',
        adresse: '',
        nombreArticle: '',
        telephone: '',
        whatsApp: '',
        facebook: '',
        categorie:null,
        type_annonce_id: '',
        annonciateur_id: '',
        marque_id: '',
        modele_id: '',
        format_id: '',
        resolution_id: '',
        couleur_id: '',
        accessoire_id: '',
        genre_id: '',
        materiau_id: '',
        connectivite_id: '',
        fonctionnalite_id: '',
        etat_id: '',
        categorie_id: '',
        produit_id: '',
        kilometrage: '',
        annee_creation: '',
        systeme_sante: '',
        age: '',
        poids: '',
        capacite: '',
        source_energie: '',
        type_cuisine: '',
        style: '',
        dimension: '',
        unite: '',
        forme: '',
        caracteristique: '',
        utilisation: '',
        fonctions: '',
        status: true,
        images:[]
    });

    const [breadcrumbs,setBreadcrumbs]=useState([
        {
            id: 1,
            text: 'Admin',
            lien: 'admin.dashboard.index',
            id1:auth.user.id
        },
        {
            id: 2,
            text: 'Annonce',
            lien: 'admin.annonce.index',
            id1:auth.user.id
        },
        {
            id: 3,
            text: 'Creation',
            lien: 'admin.annonce.create',
            id1:auth.user.id,
            active: true
        },
    ])
    const [previewsImages,setPreviewsImages]= useState([])
    const [categoriesSt,setCategoriesSt] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [champs, setChamps] = useState([]);
    const [categorieFormData, setCategorieFormData] = useState({});

    useEffect(() => {
        setCategoriesSt(categoriesGroup);
    }, [categoriesGroup]);


    const handleSubmit = (e) => {
        alert(1)
        e.preventDefault();
        post(route('annonce.store'));
    };

    function handleImages(e) {
        const files = Array.from(e.target.files);
        const newImages = [...data.images, ...files];
        setData('images',newImages)

        const filePreviews = newImages.map(file => URL.createObjectURL(file));
        setPreviewsImages(filePreviews);
    }

    const handleRemoveImage = (index) => {
        const newImages = data.images.filter((_, i) => i !== index);
        setData('images', newImages);

        const newPreviews = newImages.map(file => URL.createObjectURL(file));
        setPreviewsImages(newPreviews);
    };
    const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);


    const customFilterOptions = (options, { inputValue }) => {
        return options.filter(option => {
            const term = inputValue.toLowerCase();
            return (
                option.nom.toLowerCase().includes(term) ||
                option.categorie?.nom.toLowerCase().includes(term)
            );
        });
    };

    useEffect(() => {
        if (data.categorie) {
            router.get(route('annonce.create'), {categorieId:data.categorie.id}, {
                preserveScroll:true,preserveState:true,
                onSuccess: (response) => {
                    setChamps(response.props.champs);
                    setCategorieFormData({});
                }
            });
        }
    }, [data.categorie]);

    const handleCategorieChange = (e,val) => {
        setData('categorie',val);
    };

    const handleInputChange = (e, newValue = null) => {

        const { name, type, value, checked, files } = e.target;

        // Détermine la nouvelle valeur en fonction du type de champ
        let newValueToSet;
        switch (type) {
            case 'checkbox':
                newValueToSet = checked;
                break;
            case 'file':
                newValueToSet = files[0];
                break;
            default:
                newValueToSet = value;
        }

        // Si newValue est fourni (pour les sliders, pickers, etc.), utilise-le
        if (newValue !== null) {
            newValueToSet = newValue;
        }

        // Mise à jour de l'état avec la nouvelle valeur
        setCategorieFormData(
            {
                ...categorieFormData,
                [name]: newValueToSet
            })
    };

    return (
        <AdminPanelLayout auth={auth}>
            <div className={"w-full"}>
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
                <form onSubmit={handleSubmit} className={"grid gap-5 mt-10 w-full"}>
                    <div className={'grid gap-5 border p-2'}>
                        <div className={'font-bold text-lg text-green-500'}>Informations générales</div>
                        <div className={"w-full border flex flex-col gap-2 items-center p-2"}>
                            <div className={"flex justify-center w-full"}>
                                Jusqu'a 20 photos
                            </div>
                            <div className={'grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'}>
                                {
                                    previewsImages.map((image,index)=>(
                                        <div className={'w-full min-h-32 h-52 relative'}>
                                            <img key={index} className={'object-cover w-full h-full'} src={image} alt={'Image produit'+index}/>
                                            <div className={"top-0 right-2 absolute"}>
                                                <IconButton
                                                    color={'info'}
                                                    onClick={() => handleOpen(image)}
                                                    className="rounded-full bg-white"
                                                >
                                                    <Visibility/>
                                                </IconButton>
                                                <IconButton
                                                    color={'error'}
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="rounded-full bg-white"
                                                >
                                                    <Close/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    ))
                                }

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="dialog-title"
                                    aria-describedby="dialog-description"
                                >
                                    <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                                </Dialog>
                            </div>
                            <div className={'my-5'}>
                                <Button
                                    color="primary"
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    tabIndex={-1}
                                    size="small"
                                    startIcon={<AddOutlined/>}
                                >
                                    Ajouter photos
                                    <VisuallyHiddenInput type={'file'} multiple onChange={handleImages} />
                                </Button>
                            </div>
                        </div>
                        <div className={'grid sm:grid-cols-2 gap-5'}>
                            <TextField
                                size={"small"}
                                label="Titre"
                                fullWidth
                                value={data.titre}
                                onChange={e => setData('titre', e.target.value)}
                                error={!!errors.titre}
                                helperText={errors.titre}
                                placeholder={"Ex: Nike air jordan 1"}
                            />

                            <TextField
                                className={'sm:col-span-2'}
                                size={"small"}
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                error={!!errors.description}
                                helperText={errors.description}
                                placeholder={'Decrivez brievement votre produit...'}

                            />
                            <TextField
                                size={"small"}
                                label="Adresse"
                                fullWidth
                                value={data.adresse}
                                onChange={e => setData('adresse', e.target.value)}
                                error={!!errors.adresse}
                                helperText={errors.adresse}
                                placeholder={'Ex: Dixinn Belle-vue'}
                            />
                            <TextField
                                size={"small"}
                                label="Nombre d'articles"
                                fullWidth
                                type="number"
                                value={data.nombreArticle}
                                onChange={e => setData('nombreArticle', e.target.value)}
                                error={!!errors.nombreArticle}
                                helperText={errors.nombreArticle}
                            />
                            <TextField
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+224</InputAdornment>,
                                }}
                                size={"small"}
                                label="Téléphone"
                                fullWidth
                                value={data.telephone}
                                onChange={e => setData('telephone', e.target.value)}
                                error={!!errors.telephone}
                                helperText={errors.telephone}
                                placeholder="Ex: 621993455"
                            />
                            <TextField
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+224</InputAdornment>,
                                }}
                                size={"small"}
                                label="WhatsApp"
                                fullWidth
                                value={data.whatsApp}
                                onChange={e => setData('whatsApp', e.target.value)}
                                error={!!errors.whatsApp}
                                helperText={errors.whatsApp}
                                placeholder="Ex: 621993455"
                            />
                            <TextField
                                size={"small"}
                                label="Facebook"
                                fullWidth
                                value={data.facebook}
                                onChange={e => setData('facebook', e.target.value)}
                                error={!!errors.facebook}
                                helperText={errors.facebook}
                                placeholder="Votre lien facebook"
                            />
                        </div>

                    </div>

                    <div className={'grid sm:grid-cols-2 gap-5 border p-2'}>
                        <div className={'font-bold sm:col-span-2 text-lg text-green-500'}>Categorie</div>
                        <div>
                            <Autocomplete
                                size={"small"}
                                className={"w-full"}
                                value={data.categorie}
                                onChange={handleCategorieChange}
                                disablePortal={true}
                                options={categoriesSt.sort((a,b)=>a?.categorie?.nom.localeCompare(b?.categorie?.nom))}
                                groupBy={(option) => option.categorie?.nom}
                                getOptionLabel={(option)=>option.nom}
                                filterOptions={customFilterOptions}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params)=><TextField  fullWidth {...params} placeholder={"Catégorie"} label={params.nom}/>}
                                error={!!errors.categorie}
                            />
                        </div>

                        <div>
                            <RenderChamp size={"small"} data={categorieFormData} type={"text"} nom={'nom'} placeholder={"nom"} label={'Nom'} id={"1"} handleInputChange={handleInputChange} />
                        </div>


                        <Box mt={6}>
                            <Button variant="contained"  sx={{color:'white'}} color="primary" type="submit">
                                Créer l'annonce
                            </Button>
                        </Box>
                    </div>
                </form>

            </div>
        </AdminPanelLayout>
    );
}

export default Create;
