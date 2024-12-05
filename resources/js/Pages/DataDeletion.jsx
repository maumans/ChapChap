import { Head } from '@inertiajs/react';

export default function DataDeletion() {
    return (
        <>
            <Head title="Suppression des données" />
            
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Suppression des données
                    </h1>
                    
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Pour supprimer toutes vos données de GuineeStore, veuillez suivre ces étapes :
                        </p>
                        
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Connectez-vous à votre compte Facebook</li>
                            <li>Accédez aux paramètres de votre compte</li>
                            <li>Dans "Applications et sites web", trouvez GuineeStore</li>
                            <li>Cliquez sur "Supprimer" pour retirer l'application</li>
                        </ol>

                        <p className="text-gray-600 mt-4">
                            Une fois ces étapes effectuées, toutes vos données seront supprimées de notre système.
                        </p>

                        <div className="mt-6 text-sm text-gray-500">
                            <p>Pour toute question concernant la suppression de vos données, contactez-nous à :</p>
                            <a 
                                href="mailto:contact@guineestore.com" 
                                className="text-blue-500 hover:underline"
                            >
                                contact@guineestore.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
