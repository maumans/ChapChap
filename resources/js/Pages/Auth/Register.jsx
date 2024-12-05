import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import { Box, Button, Container, Divider, IconButton, InputAdornment, Paper, TextField, Typography, Alert, InputLabel } from '@mui/material';
import { Google, Facebook, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { detectInputType, formatGuineaPhone, isValidGuineaPhone } from '@/Utils/inputValidation';

export default function Register({ status, categories }) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        prenom: '',
        nom: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const formattedPhone = formatGuineaPhone(value);
        setData('phone', formattedPhone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Valider le numéro de téléphone avant de soumettre
        if (!isValidGuineaPhone(data.phone)) {
            setData('errors', {
                ...errors,
                phone: 'Le numéro de téléphone doit être un numéro guinéen valide (+224)'
            });
            return;
        }
        
        post(route('register'));
    };

    return (
        <Authenticated user={null} categories={categories}>
            <Head title="Inscription" />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 4, 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        mt: 8,
                        backgroundColor: 'background.paper',
                        boxShadow: theme.shadows[3]
                    }}
                >
                    <Typography 
                        component="h1" 
                        variant="h4" 
                        sx={{ 
                            mb: 3, 
                            color: theme.palette.primary.main,
                            fontWeight: 600
                        }}
                    >
                        Créer un compte
                    </Typography>

                    {status && (
                        <Alert severity="success" sx={{ mb: 2, width: '100%' }}>
                            {status}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <div className="space-y-4 w-full">
                            {/* Nom et Prénom */}
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div>
                                    <InputLabel htmlFor="prenom" sx={{ mb: 1 }}>
                                        Prénom
                                    </InputLabel>
                                    <TextField
                                        id="prenom"
                                        type="text"
                                        name="prenom"
                                        value={data.prenom}
                                        onChange={(e) => setData('prenom', e.target.value)}
                                        error={!!errors.prenom}
                                        helperText={errors.prenom}
                                        fullWidth
                                        size="small"
                                        placeholder="Votre prénom"
                                        autoComplete="given-name"
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: theme.palette.primary.main,
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="nom" sx={{ mb: 1 }}>
                                        Nom
                                    </InputLabel>
                                    <TextField
                                        id="nom"
                                        type="text"
                                        name="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        error={!!errors.nom}
                                        helperText={errors.nom}
                                        fullWidth
                                        size="small"
                                        placeholder="Votre nom"
                                        autoComplete="family-name"
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: theme.palette.primary.main,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" sx={{ mb: 1 }}>
                                    Email
                                </InputLabel>
                                <TextField
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    fullWidth
                                    size="small"
                                    placeholder="exemple@email.com"
                                    autoComplete="email"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {/* Téléphone */}
                            <div>
                                <InputLabel htmlFor="phone" sx={{ mb: 1 }}>
                                    Numéro de téléphone
                                </InputLabel>
                                <TextField
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handlePhoneChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone || "Format: +224 XX XX XX XX"}
                                    fullWidth
                                    size="small"
                                    placeholder="+224 XX XX XX XX"
                                    autoComplete="tel"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {/* Mot de passe */}
                            <div>
                                <InputLabel htmlFor="password" sx={{ mb: 1 }}>
                                    Mot de passe
                                </InputLabel>
                                <TextField
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    fullWidth
                                    size="small"
                                    placeholder="Votre mot de passe"
                                    autoComplete="new-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {/* Confirmation du mot de passe */}
                            <div>
                                <InputLabel htmlFor="password_confirmation" sx={{ mb: 1 }}>
                                    Confirmer le mot de passe
                                </InputLabel>
                                <TextField
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    error={!!errors.password_confirmation}
                                    helperText={errors.password_confirmation}
                                    fullWidth
                                    size="small"
                                    placeholder="Confirmez votre mot de passe"
                                    autoComplete="new-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={processing}
                                color='primary'
                                className='hover:bg-green-600 transition duration-300'
                                sx={{ 
                                    mt: 3,
                                    mb: 2,
                                    py: 1,
                                    color: 'white',
                                }}
                            >
                                S'inscrire
                            </Button>

                            <Divider sx={{ my: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    OU
                                </Typography>
                            </Divider>

                            {/* Boutons de connexion sociale */}
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<Google />}
                                    onClick={() => window.location.href = route('google.redirect')}
                                    size="small"
                                    sx={{ 
                                        borderColor: '#DB4437',
                                        color: '#DB4437',
                                        '&:hover': {
                                            borderColor: '#DB4437',
                                            backgroundColor: 'rgba(219, 68, 55, 0.04)'
                                        },
                                        textTransform: 'none',
                                        py: 1
                                    }}
                                >
                                    Google
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<Facebook />}
                                    onClick={() => window.location.href = route('facebook.redirect')}
                                    size="small"
                                    sx={{ 
                                        borderColor: '#4267B2',
                                        color: '#4267B2',
                                        '&:hover': {
                                            borderColor: '#4267B2',
                                            backgroundColor: 'rgba(66, 103, 178, 0.04)'
                                        },
                                        textTransform: 'none',
                                        py: 1
                                    }}
                                >
                                    Facebook
                                </Button>
                            </div>

                            <Typography 
                                variant="body2" 
                                align="center" 
                                sx={{ 
                                    mt: 3,
                                    color: theme.palette.text.secondary
                                }}
                            >
                                Déjà inscrit ?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-primary hover:text-primary-dark"
                                >
                                    Se connecter
                                </Link>
                            </Typography>
                        </div>
                    </Box>
                </Paper>
            </Container>
        </Authenticated>
    );
}
