import React, { useContext, useState } from 'react';
import { TodoContext } from "../Context.jsx";
// import { INITIAL_STATE } from "../init.js"; 

export default function Cartes(notes ) {
    const todoContext = useContext(TodoContext);
    // const [state, setState] = useState(INITIAL_STATE); 
    // const { affiche } = state;

console.log(notes.notes)


    return (
        <section className="Note">
            <h2>Mes notes :</h2>
            <section>
                <div>
                    {notes.notes.map((note) => {
                        return (
                            <div key={note._id}>
                                <button
                                    onClick={() => {
                                        // setState({ ...state, affiche: !affiche }); 
                                    }}
                                >
                                    {note.name}
                                </button>
                                
                                    <div>
                                        <p>Quantité : {note.quantity}</p>
                                        <p>Couleur : {note.color}</p>
                                    </div>
                                
                                {/* <button onClick={() => todoContext.supprimer(note.name)}>Supprimer</button> */}
                            </div>
                        );
                    })}
                </div>
            </section>
        </section>
    );
}
