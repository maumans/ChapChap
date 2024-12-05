import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import { Box, Button, Checkbox, Container, Divider, FormControlLabel, IconButton, InputAdornment, Paper, TextField, Typography, Alert, InputLabel } from '@mui/material';
import { Google, Facebook, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { detectInputType, formatPhoneNumber, validateEmail, validatePhone } from '@/Utils/inputValidation';

export default function Login({ status, canResetPassword, categories, error }) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState('email');

    const { data, setData, post, processing, errors, reset } = useForm({
        identifier: '', // Champ unique pour email ou téléphone
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // Gère le changement dans le champ identifier
    const handleIdentifierChange = (e) => {
        const value = e.target.value;
        const type = detectInputType(value);
        setInputType(type);

        // Si c'est un numéro de téléphone, on le formate
        const formattedValue = type === 'phone' ? formatPhoneNumber(value) : value;
        setData('identifier', formattedValue);
    };

    const submit = (e) => {
        e.preventDefault();
        
        // Valider l'entrée avant de soumettre
        const isValid = inputType === 'email' 
            ? validateEmail(data.identifier)
            : validatePhone(data.identifier);

        if (!isValid) {
            // Gérer l'erreur de validation
            return;
        }

        // Ajouter le type d'identifiant aux données
        const formData = {
            ...data,
            login_type: inputType
        };

        post(route('login'), formData);
    };

    return (
        <Authenticated user={null} categories={categories}>
            <Head title="Connexion" />
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
                        Connexion
                    </Typography>

                    {status && (
                        <Alert severity="success" sx={{ mb: 2, width: '100%' }}>
                            {status}
                        </Alert>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={submit} sx={{ width: '100%' }}>
                        <div className="space-y-4 w-full">
                            {/* Champ Email/Téléphone unifié */}
                            <div>
                                <InputLabel htmlFor="identifier" sx={{ mb: 1 }}>
                                    Email ou Numéro de téléphone
                                </InputLabel>
                                <TextField
                                    id="identifier"
                                    type="text"
                                    name="identifier"
                                    value={data.identifier}
                                    onChange={handleIdentifierChange}
                                    error={!!errors.identifier}
                                    helperText={errors.identifier}
                                    fullWidth
                                    size="small"
                                    placeholder="Entrez votre email ou numéro de téléphone"
                                    autoComplete="username"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {/* Champ Mot de passe */}
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
                                    autoComplete="current-password"
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

                            <div className="flex items-center justify-between w-full">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            Se souvenir de moi
                                        </Typography>
                                    }
                                />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-primary hover:text-primary-dark"
                                    >
                                        Mot de passe oublié?
                                    </Link>
                                )}
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={processing}
                                className='hover:bg-green-600 transition duration-300'
                                sx={{ 
                                    mt: 3,
                                    mb: 2,
                                    py: 1,
                                    color: 'white',
                                }}
                            >
                                Se connecter
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
                                Pas encore inscrit ?{' '}
                                <Link
                                    href={route('register')}
                                    className="text-primary hover:text-primary-dark"
                                >
                                    Créer un compte
                                </Link>
                            </Typography>
                        </div>
                    </Box>
                </Paper>
            </Container>
        </Authenticated>
    );
}
