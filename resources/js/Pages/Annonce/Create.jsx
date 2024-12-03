import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button, 
    Divider,
    FormControl, 
    IconButton, 
    InputAdornment,
    InputLabel,
    MenuItem, 
    Select,
    TextField,
} from "@mui/material";
import {Link, router, useForm} from "@inertiajs/react";
import { 
    AddOutlined, 
    AddAPhoto,
    Close, 
    ContactPhone,
    Facebook,
    Info, 
    Place, 
    PriceChange,
    Visibility
} from "@mui/icons-material";
import {VisuallyHiddenInput} from "@/Components/VisuallyHiddenInput.jsx";
import Dialog from '@mui/material/Dialog';
import RenderChamp from "@/Components/RenderChamp.jsx";

function Create({auth,categories,categoriesGroup,devises}) {

    const { data, setData, post, errors } = useForm({
        titre: '',
        prix: '',
        devise_id: 1, // ID de la devise GNF par défaut
        description: '',
        adresse: '',
        nombreArticle: '',
        telephone: '',
        whatsApp: '',
        facebook: '',
        categorie: null,
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
        images: [],
        champs: {}
    });


    const [categoriesSt,setCategoriesSt] = useState([]);
    useEffect(() => {
        setCategoriesSt(categoriesGroup);
    }, [categoriesGroup]);


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('annonce.store'))
    };

    const [breadcrumbs,setBreadcrumbs]=useState([
        {
            id: 1,
            text: 'Annonce',
            lien: 'annonce.index',
        },
        {
            id: 2,
            text: 'Creation',
            lien: 'annonce.create',
        },
    ])

    const [previewsImages,setPreviewsImages]= useState([])

    function handleImages(e) {
        const files = Array.from(e.target.files);
        const newImages = [...data.images, ...files];
        setData('images',newImages)

        const filePreviews = newImages.map(file => URL.createObjectURL(file));
        setPreviewsImages(filePreviews);
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = useState(false);

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

    const [champs, setChamps] = useState([]);

    useEffect(() => {
        if (data.categorie) {
            axios.post(route('annonce.categorieChamps'), {
                categorieId: data.categorie.id
            })
            .then((response) => {
                setChamps(response.data);
                setData('champs', {});
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des champs:', error);
            });
        }
    }, [data.categorie]);

    const handleCategorieChange = (e,val) => {
        setData('categorie',val);
    };

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target;
        
        // Détermine la valeur en fonction du type de champ
        let newValue;
        switch (type) {
            case 'checkbox':
                newValue = checked;
                break;
            case 'number':
                newValue = value === '' ? '' : Number(value);
                break;
            default:
                newValue = value;
        }

        // Met à jour les valeurs des champs dans le state du formulaire
        setData('champs', {
            ...data.champs,
            [name]: newValue
        });
    };


    return (
        <Authenticated user={auth.user} categories={categories}>
            <div className={"flex justify-center w-full md:mt-14 mt-24"}>
                <div className={'max-w-6xl w-full px-4'}>
                    <Breadcrumbs aria-label="breadcrumb" separator={"/"}>
                        {
                            breadcrumbs.map(({id,text,lien,href,active,icon}) =>(
                                <Link href={route(lien)} key={id} color={'text.primary'} underline="hover" aria-current="page">
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
                        {/* Section Photos */}
                        <div className={'grid gap-5 border rounded-lg p-4 bg-white'}>
                            <div className={'font-bold text-lg text-green-500 flex items-center gap-2'}>
                                <AddAPhoto className="text-gray-600" /> Photos
                            </div>
                            <div className={"w-full border rounded-lg flex flex-col gap-2 items-center p-4 bg-gray-50"}>
                                <div className={"flex justify-center w-full text-gray-600 text-sm"}>
                                    Ajoutez jusqu'à 20 photos
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
                        </div>

                        {/* Section Informations */}
                        <div className={'grid gap-6 border rounded-lg p-4 bg-white'}>
                            <div className={'font-bold text-lg text-green-500 flex items-center gap-2'}>
                                <Info className="text-gray-600" /> Informations générales
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

                                <div className="sm:col-span-2">
                                    <TextField
                                        size={"small"}
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                    />
                                </div>

                                <div className="sm:col-span-2">
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
                                        renderInput={(params)=><TextField  
                                            fullWidth 
                                            {...params} 
                                            placeholder={"Sélectionnez une catégorie"} 
                                            label="Catégorie"
                                            error={!!errors.categorie}
                                            helperText={errors.categorie}
                                        />}
                                    />
                                </div>

                                {champs && champs.length > 0 && (
                                    <div className="sm:col-span-2 grid sm:grid-cols-2 gap-5">
                                        {champs.map((champ) => (
                                            <RenderChamp
                                                key={champ.id}
                                                id={champ.id}
                                                nom={champ.nom}
                                                type={champ.type}
                                                label={champ.label}
                                                options={champ.options ? champ.options : null}
                                                placeholder={champ.description}
                                                size="small"
                                                handleInputChange={handleInputChange}
                                                data={data.champs}
                                                error={errors[`champs.${champ.nom}`]}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section Prix et État */}
                        <div className={'grid gap-6 border rounded-lg p-4 bg-white'}>
                            <div className={'font-bold text-lg text-green-500 flex items-center gap-2'}>
                                <PriceChange className="text-gray-600" /> Prix et état
                            </div>
                            <div className={'grid sm:grid-cols-2 gap-5'}>
                                <FormControl size="small" fullWidth error={!!errors.etat_id}>
                                    <InputLabel>État</InputLabel>
                                    <Select
                                        label="État"
                                        value={data.etat_id}
                                        onChange={e => setData('etat_id', e.target.value)}
                                    >
                                        <MenuItem value="neuf">Neuf</MenuItem>
                                        <MenuItem value="excellent">Excellent</MenuItem>
                                        <MenuItem value="tres_bon">Très bon</MenuItem>
                                        <MenuItem value="bon">Bon</MenuItem>
                                        <MenuItem value="acceptable">Acceptable</MenuItem>
                                    </Select>
                                </FormControl>

                                <div className="relative flex items-center gap-2">
                                    <TextField
                                        size="small"
                                        label="Prix"
                                        fullWidth
                                        type="number"
                                        value={data.prix}
                                        onChange={e => setData('prix', e.target.value)}
                                        error={!!errors.prix}
                                        helperText={errors.prix}
                                        placeholder="Ex: 1000000"
                                        InputProps={{
                                            endAdornment: (
                                                <div className="flex items-center">
                                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                                    <Select
                                                        value={data.devise_id}
                                                        onChange={e => setData('devise_id', e.target.value)}
                                                        variant="standard"
                                                        sx={{
                                                            '& .MuiSelect-select': {
                                                                border: 'none',
                                                                paddingRight: '24px',
                                                                minWidth: '60px',
                                                            },
                                                            '&:before': {
                                                                display: 'none',
                                                            },
                                                            '&:after': {
                                                                display: 'none',
                                                            },
                                                        }}
                                                    >
                                                        {devises.map(devise => (
                                                            <MenuItem key={devise.id} value={devise.id}>
                                                                {devise.symbole}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            ),
                                        }}
                                    />
                                </div>

                                <TextField
                                    size={"small"}
                                    label="Nombre d'articles"
                                    type="number"
                                    fullWidth
                                    value={data.nombreArticle}
                                    onChange={e => setData('nombreArticle', e.target.value)}
                                    error={!!errors.nombreArticle}
                                    helperText={errors.nombreArticle}
                                />
                            </div>
                        </div>

                        {/* Section Contact */}
                        <div className={'grid gap-6 border rounded-lg p-4 bg-white'}>
                            <div className={'font-bold text-lg text-green-500 flex items-center gap-2'}>
                                <ContactPhone className="text-gray-600" /> Contact
                            </div>
                            <div className={'grid sm:grid-cols-2 gap-5'}>
                                <TextField
                                    size="small"
                                    label="Adresse"
                                    fullWidth
                                    value={data.adresse}
                                    onChange={e => setData('adresse', e.target.value)}
                                    error={!!errors.adresse}
                                    helperText={errors.adresse}
                                    placeholder="Ex: Quartier Kipé, Commune de Ratoma"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Place className="text-gray-400" />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Facebook className="text-gray-400" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>

                        <Box mt={2}>
                            <Button 
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    color: 'white',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    py: 1.5
                                }}
                                type="submit"
                            >
                                Publier l'annonce
                            </Button>
                        </Box>
                    </form>

                </div>
            </div>
        </Authenticated>
    );
}

export default Create;
