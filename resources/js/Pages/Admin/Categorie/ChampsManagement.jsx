import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout.jsx";
import { Button, IconButton } from '@mui/material';
import { Save } from '@mui/icons-material';
import {router} from "@inertiajs/react";

function ChampsManagement({ auth, categorie }) {
    const [champs, setChamps] = useState(categorie.champs || []);

    // Handle drag and drop
    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // If no destination, return early
        if (!destination) {
            return;
        }

        // If the position hasn't changed, return early
        if (source.index === destination.index) {
            return;
        }

        // Reorder the champs array
        const reorderedChamps = Array.from(champs);
        const [removed] = reorderedChamps.splice(source.index, 1);
        reorderedChamps.splice(destination.index, 0, removed);

        setChamps(reorderedChamps);
    };

    // Handle save
    const handleSave = () => {
        // Send the reordered champs to the server to update the order in the database
        const orderedChamps = champs.map((champ, index) => ({
            id: champ.id,
            ordre: index + 1, // New order
        }));

        router.post(route('admin.categorie.updateChampsOrdre',[auth.user.id,categorie.id]), {
            champs: orderedChamps,
        }, {
            onSuccess: () => {
                alert('Ordre des champs mis à jour avec succès');
            },
        });
    };

    return (
        <AdminPanelLayout auth={auth}>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Gestion des champs pour la catégorie: {categorie.nom}</h1>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="champs">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-2"
                            >
                                {champs.map((champ, index) => (
                                    <Draggable key={champ.id} draggableId={champ.id.toString()} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="px-4 py-2 bg-white border rounded shadow-sm flex justify-between items-center"
                                            >
                                                <span>{champ.nom}</span>
                                                <span>Ordre: {index + 1}</span>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="mt-4">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={handleSave}
                    >
                        Enregistrer l'ordre
                    </Button>
                </div>
            </div>
        </AdminPanelLayout>
    );
}

export default ChampsManagement;
