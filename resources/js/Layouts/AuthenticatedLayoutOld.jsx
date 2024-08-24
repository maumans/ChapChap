import {useEffect, useRef, useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import {createTheme, Divider, MenuItem, OutlinedInput, Select, ThemeProvider} from "@mui/material";
import {frFR} from "@mui/material/locale";
import {Favorite, ListAlt, Logout, Person, Search} from "@mui/icons-material";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {A11y, Navigation, Pagination} from "swiper/modules";
import CategorieMain from "@/Components/Silder/Categorie/CategorieMain.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Authenticated({ user, header, children,categories }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

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

    const [categorie, setCategorie] = useState('Toutes les catégories');
    const [categorieHover, setCategorieHover] = useState(null);
    //const [categories, setCategories] = useState(categories);
/*
    const [categories, setCategories] = useState([
        {
            'id':1,
            'nom':'Homme'
        },
        {
            'id':2,
            'nom':'Femme'
        },
        {
            'id':3,
            'nom':'Enfant'
        },
        {
            'id':4,
            'nom':'Electronique'
        },
        {
            'id':5,
            'nom':'Divertissement'
        },
        {
            'id':6,
            'nom':'Maison'
        },
    ]);
*/

    const [menu,setMenu] = useState(false);

    function handleMouseEnter(c)
    {
        setCategorieHover(c)
    }

    function closeMenu()
    {
        setCategorieHover(null)
    }

    useEffect(()=>{
        console.log(categorieHover)
        categorieHover ? setMenu(true):setMenu(false)
    },[categorieHover])

    const handleChange = (event) => {
        setCategorie(event.target.value);
    };


    return (
        <ThemeProvider theme={theme}>
            <div className="min-h-screen bg-gray-100 relative">
                <nav className="bg-white border-b text-white border-gray-100 fixed w-full z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-12">
                            <div className="flex items-center sm:ml-0 sm:mr-0 md:ml-auto mr-auto w-3/12">
                                <Link href="/" className={'text-2xl font-bold text-green-500'}>
                                    ChapChap
                                </Link>
                            </div>

                            <div className="flex items-center w-6/12">
                                <div className="hidden sm:-my-px sm:ms-10 md:flex text-white w-full">
                                    <div className={'bg-white rounded h-10 flex justify-between items-center w-full border border-green-500'}>
                                        <Select

                                            className={"h-10"}
                                            value={categorie}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            sx={{border: 'none', "& fieldset": { border: 'none' },}}
                                        >
                                            <MenuItem value={'Toutes les catégories'}>Toutes les catégories</MenuItem>
                                            {
                                                categories?.map((c)=>(
                                                    <MenuItem key={c.id} value={c.nom}>{c.nom}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                        <OutlinedInput sx={{border: 'none', "& fieldset": { border: 'none' },}} className={'h-10 w-full'} placeholder="Recherche..." />
                                        <div className={'rounded bg-green-500 mr-2 font-bold'}>
                                            <Search className={'text-white p-0.5 px-1 font-bold'}/>
                                        </div>
                                    </div>
                                    {/*<NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>*/}
                                </div>
                            </div>

                            <div className="hidden md:flex sm:items-center sm:ms-6 w-3/12">
                                <div className="ms-3 relative">
                                    {
                                        user ?
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                        >
                                                            {
                                                                "Bonjour, "+user.name
                                                            }

                                                            <svg
                                                                className="ms-2 -me-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    {
                                                        user ?
                                                            <>
                                                                <Dropdown.Link href={route('profile.edit')}><span className={"flex items-center gap-2"}><Person className={'text-green-500'}/> Profil</span></Dropdown.Link>
                                                                <Dropdown.Link href={route('profile.edit')}><span className={"flex items-center gap-2"}><Favorite className={'text-green-500'}/> Vos favoris</span></Dropdown.Link>
                                                                <Dropdown.Link href={route('profile.edit')}><span className={"flex items-center gap-2"}><ListAlt className={'text-green-500'}/> Vos annonces</span></Dropdown.Link>
                                                                <Divider/>
                                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                                    <div className={"flex items-center justify-center gap-2 p-1 text-red-500"}><Logout/> Déconnexion</div>
                                                                </Dropdown.Link>
                                                            </>
                                                            :
                                                            <>
                                                                <Dropdown.Link href={route('login')}>Connexion</Dropdown.Link>
                                                                <Dropdown.Link href={route('register')}>Inscription</Dropdown.Link>
                                                            </>
                                                    }
                                                </Dropdown.Content>
                                            </Dropdown>
                                            :
                                            <div className={"flex divide-x text-sm bg-green-500 text-gray-100 rounded"}>
                                                <Link href={route('login')} className={"p-1 hover:underline"}>Connexion</Link>
                                                <Link href={route("register")} className={"p-1 hover:underline"}>S'inscrire</Link>
                                            </div>
                                    }

                                </div>
                            </div>

                            <div className="-me-2 flex items-center md:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                        {
                            user ?
                                <>
                                    <div className="pt-2 pb-3 space-y-1">
                                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            Dashboard
                                        </ResponsiveNavLink>
                                    </div>

                                    <div className="pt-4 pb-1 border-t border-gray-200">
                                        <div className="px-4">
                                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                        </div>

                                        <div className="mt-3 space-y-1">
                                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                Déconnexion
                                            </ResponsiveNavLink>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="pt-2 pb-3 space-y-1">
                                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            Dashboard
                                        </ResponsiveNavLink>
                                    </div>
                                </>
                        }
                    </div>
                </nav>

                <header className="bg-white bg-opacity-90 shadow fixed w-full z-40 top-12">
                    <div className="max-w-4xl mx-auto">

                        <div className={'flex md:hidden px-4 sm:px-6 lg:px-8'}>
                            <div className={'bg-white rounded h-10 flex justify-between items-center w-full border border-green-500 my-1'}>
                                <Select
                                    className={"h-10"}
                                    value={categorie}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{border: 'none', "& fieldset": { border: 'none' },}}
                                >
                                    <MenuItem value={'Toutes les catégories'}>Toutes les catégories</MenuItem>
                                    {
                                        categories?.map((c)=>(
                                            <MenuItem key={c.id} value={c.nom}><span className={"first-letter:uppercase"}>{c.nom}</span></MenuItem>
                                        ))
                                    }
                                </Select>
                                <OutlinedInput sx={{border: 'none', "& fieldset": { border: 'none' },}} className={'h-10 w-full'} placeholder="Recherche..." />
                                <div className={'rounded bg-green-500 mr-2 font-bold'}>
                                    <Search className={'text-white p-0.5 px-1 font-bold'}/>
                                </div>
                            </div>
                        </div>
                        <Divider className={'flex md:hidden'}/>
                        <div onMouseLeave={closeMenu}>
                            <CategorieMain handleMouseLeave={closeMenu} categories={categories} handleMouseEnter={handleMouseEnter}/>
                            <div onMouseLeave={closeMenu} className={`w-full max-w-4xl bg-white z-50 absolute flex divide-x rounded-b-2xl border ${menu ?'flex transition duration-500':'hidden'}`}>
                                <div className={'w-3/12 bg-green-50 font-bold text-lg p-3 first-letter:uppercase'}>
                                    {
                                        categorieHover && categorieHover.nom
                                    }
                                </div>
                                <div className={'w-9/12'}>
                                    <div className={"w-full overflow-y-scroll text-sm p-4 grid md:grid-cols-3 sm:grid-cols-2 gap-5"}>
                                        {
                                            categorieHover?.categories?.map(cat=>(
                                                <div key={cat.id} className={"w-full"}>
                                                    <div className={'font-bold'}>
                                                        <Link href={route('categorie.show',cat.id)}><div className={"first-letter:uppercase hover:text-green-500"}>{cat?.nom}</div></Link>
                                                    </div>

                                                    <div className={'grid gap-2'}>
                                                        {
                                                            cat?.categories?.length>0
                                                            &&
                                                            <Divider/>
                                                        }

                                                        {
                                                            cat?.categories?.map(c=>(
                                                                <div key={c.id}>
                                                                    <Link href={route('categorie.show',c.id)}>
                                                                        <div className={"first-letter:uppercase hover:text-green-500"}>{c?.nom}</div>
                                                                    </Link>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className={'pt-12 min-h-max'}>{children}</main>

                <Footer/>
            </div>
        </ThemeProvider>
    );
}
