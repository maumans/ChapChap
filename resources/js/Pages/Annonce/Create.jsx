import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button, DialogContent,
    Divider,
    FormControl, IconButton, InputAdornment,
    InputLabel,
    MenuItem, Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Link, useForm} from "@inertiajs/react";
import Image1 from "../../../images/Welcome img 1.jpg"
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import Image2
    from "../../../images/gros-plan-jolie-jeune-femme-afro-americaine-regardant-enthousiasme-ecran-son-ordinateur-portable_181624-43269.jpg";
import {formatNumber} from "chart.js/helpers";
import Image3 from "../../../images/Welcome img 1.jpg";
import {Add, AddOutlined, Close, Favorite, InputOutlined, Label, Place, Visibility} from "@mui/icons-material";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {VisuallyHiddenInput} from "@/Components/VisuallyHiddenInput.jsx";
import Dialog from '@mui/material/Dialog';

function Create({auth,categories,devises}) {

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

    useEffect(()=>{
        console.log(categories)
    })


    const [categoriesSt,setCategoriesSt] = useState([]);


    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        setData('categorie_id', value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //post('/annonces');
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
                                    <span className={active?'text-orange-500 text-sm':'text-sm text-black'}>
                                    {text}
                                </span>
                                </Link>
                            ))
                        }
                    </Breadcrumbs>
                    <div className={"grid gap-5 mt-10 w-full"}>

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

                        <div className={'grid gap-5 border p-2'}>
                            <div className={'font-bold text-lg text-green-500'}>Categorie</div>
                            <div className={'grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'}>
                                <Autocomplete
                                    size={"small"}
                                    className={"w-full"}
                                    onChange={(e,val)=>setData("categorie",val)}
                                    disablePortal={true}
                                    options={categories.sort((a,b)=>a?.categorie?.nom.localeCompare(b?.categorie?.nom))}
                                    groupBy={(option) => option.categorie?.nom}
                                    getOptionLabel={(option)=>option.nom}
                                    filterOptions={customFilterOptions}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params)=><TextField  fullWidth {...params} placeholder={"Categorie"} label={params.nom}/>}
                                    error={!!errors.categorie}
                                />

                            </div>

                            Affichage conditionnel basé sur la catégorie sélectionnée
                            {selectedCategory === 'voiture' && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails du véhicule</Typography>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField
                                            label="Kilométrage"
                                            fullWidth
                                            value={data.kilometrage}
                                            onChange={e => setData('kilometrage', e.target.value)}
                                            error={!!errors.kilometrage}
                                            helperText={errors.kilometrage}
                                        />
                                        <TextField
                                            label="Année de création"
                                            fullWidth
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={data.annee_creation}
                                            onChange={e => setData('annee_creation', e.target.value)}
                                            error={!!errors.annee_creation}
                                            helperText={errors.annee_creation}
                                        />
                                    </div>
                                </Box>
                            )}

                            {selectedCategory === 'sante' && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails de santé et beauté</Typography>
                                    <TextField
                                        label="Système de santé"
                                        fullWidth
                                        value={data.systeme_sante}
                                        onChange={e => setData('systeme_sante', e.target.value)}
                                        error={!!errors.systeme_sante}
                                        helperText={errors.systeme_sante}
                                    />
                                </Box>
                            )}

                            {selectedCategory === 'bebe' && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails de bébé et soin des enfants</Typography>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField
                                            label="Âge"
                                            fullWidth
                                            value={data.age}
                                            onChange={e => setData('age', e.target.value)}
                                            error={!!errors.age}
                                            helperText={errors.age}
                                        />
                                        <TextField
                                            label="Poids"
                                            fullWidth
                                            value={data.poids}
                                            onChange={e => setData('poids', e.target.value)}
                                            error={!!errors.poids}
                                            helperText={errors.poids}
                                        />
                                    </div>
                                </Box>
                            )}

                            {['tablettes', 'telephones'].includes(selectedCategory) && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails des appareils électroniques</Typography>
                                    <TextField
                                        label="Capacité"
                                        fullWidth
                                        value={data.capacite}
                                        onChange={e => setData('capacite', e.target.value)}
                                        error={!!errors.capacite}
                                        helperText={errors.capacite}
                                    />
                                </Box>
                            )}

                            {['gros_electromenager', 'petit_electromenager'].includes(selectedCategory) && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails des appareils électroménagers</Typography>
                                    <TextField
                                        label="Source d'énergie"
                                        fullWidth
                                        value={data.source_energie}
                                        onChange={e => setData('source_energie', e.target.value)}
                                        error={!!errors.source_energie}
                                        helperText={errors.source_energie}
                                    />
                                </Box>
                            )}

                            {['cuisine', 'maison'].includes(selectedCategory) && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails de cuisine et maison</Typography>
                                    <TextField
                                        label="Type de cuisine"
                                        fullWidth
                                        value={data.type_cuisine}
                                        onChange={e => setData('type_cuisine', e.target.value)}
                                        error={!!errors.type_cuisine}
                                        helperText={errors.type_cuisine}
                                    />
                                </Box>
                            )}

                            {['meubles', 'deco', 'bureau'].includes(selectedCategory) && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails des meubles et décorations</Typography>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField
                                            label="Style"
                                            fullWidth
                                            value={data.style}
                                            onChange={e => setData('style', e.target.value)}
                                            error={!!errors.style}
                                            helperText={errors.style}
                                        />
                                        <TextField
                                            label="Dimension"
                                            fullWidth
                                            value={data.dimension}
                                            onChange={e => setData('dimension', e.target.value)}
                                            error={!!errors.dimension}
                                            helperText={errors.dimension}
                                        />
                                        <TextField
                                            label="Unité"
                                            fullWidth
                                            value={data.unite}
                                            onChange={e => setData('unite', e.target.value)}
                                            error={!!errors.unite}
                                            helperText={errors.unite}
                                        />
                                        <TextField
                                            label="Forme"
                                            fullWidth
                                            value={data.forme}
                                            onChange={e => setData('forme', e.target.value)}
                                            error={!!errors.forme}
                                            helperText={errors.forme}
                                        />
                                    </div>
                                </Box>
                            )}

                            {['outils', 'jardin', 'bricolage'].includes(selectedCategory) && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails des outils, jardin et bricolage</Typography>
                                    <TextField
                                        label="Caractéristique"
                                        fullWidth
                                        value={data.caracteristique}
                                        onChange={e => setData('caracteristique', e.target.value)}
                                        error={!!errors.caracteristique}
                                        helperText={errors.caracteristique}
                                    />
                                </Box>
                            )}

                            {['sport', 'loisir', 'voyage'].includes(selectedCategory) && (
                                <Box mt={4}>
                                    <Typography variant="h6" gutterBottom>Détails des sports, loisirs et voyages</Typography>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField
                                            label="Utilisation"
                                            fullWidth
                                            value={data.utilisation}
                                            onChange={e => setData('utilisation', e.target.value)}
                                            error={!!errors.utilisation}
                                            helperText={errors.utilisation}
                                        />
                                        <TextField
                                            label="Fonctions"
                                            fullWidth
                                            value={data.fonctions}
                                            onChange={e => setData('fonctions', e.target.value)}
                                            error={!!errors.fonctions}
                                            helperText={errors.fonctions}
                                        />
                                    </div>
                                </Box>
                            )}

                            <Box mt={6}>
                                <Button variant="contained" color="primary" type="submit">
                                    Créer l'annonce
                                </Button>
                            </Box>
                        </div>
                    </div>

                </div>
            </div>
        </Authenticated>
    );
}

export default Create;
