import React from 'react';
import {NavLink} from 'react-router-dom';
function CharacterDetailBlock({id}) {
    return (
        <div>
            <NavLink to={`/detailCharacter/${id}`}>{id}</NavLink>
        </div>
    );
}

export default CharacterDetailBlock;