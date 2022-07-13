import React, {useState,useEffect} from 'react';
import NavBar from "../component/NavBar";
import Title from "../component/Title";
import './style.css';
import CharacterDetailBlock from "../component/CharacterDetailBlock";
import Comment from "../component/Comment";

function Homepage(props) {
    const [search, setSearch] = useState('');
    const [charDatas, setCharDatas] = useState([]);
    const [houseDatas,setHouseDatas]=useState([]);
    const [filterState, setFilterState] = useState("all")
    const URL_Charcter = "https://hp-assessment-api.herokuapp.com/hp/characters";
    const axios = require('axios');

    const filterByCategoryHandler = (e) => {
        console.log("in filter handler-->",e.target.value);

        if (e.target.value === "all") {
            setFilterState("all")
        } else {
            setFilterState(parseInt(e.target.value)) // houseId's
        }

    }
    useEffect(() => {
        const getContent= async () => {
            const result = await axios.get(URL_Charcter);
            setCharDatas(result.data);
        };
        getContent();
    }, []);
    console.log('Data is: ',filterState);

     let sortedDatas=[...charDatas].filter(c => {
         return filterState === "all" ? true : c.houseId === filterState
     });
    console.log('sortedDatas',sortedDatas);
    sortedDatas.sort((a,b)=>(a.name).localeCompare(b.name));
    console.log('sortedDatas(after)-->',sortedDatas);

    return (
        <div className="main">
            <NavBar/>
            <Title title="Characters"/>
            <div className="search">
                <label>Search: </label>
                <input type="text" name="search" value={search}/>
                <label>{'    '}By Category:</label>
                <select onChange={filterByCategoryHandler} value={filterState}>
                    <option defaultValue='all' value='all'>All</option>
                    <option value={1}>Gryfindor</option>
                    <option value={2}>Slytherin</option>
                    <option value={3}>Hufflepuff</option>
                    <option value={4}>:Ravenclaw</option>
                </select>
            </div>


            <ul className="ulShow">

                     {sortedDatas?.map((data,index) => {
                        const {id, name, born, imgUrl, house} = data;
                        return (
                            <div className="showList">
                                 <li><img className="imgCharter" alt="photo" src={imgUrl}/></li>
                                <li> ID : {id}</li>
                                <li>Name : {name}</li>
                                <li>Born : {born}</li>
                                <li>House Name :{house.name}</li>
                                <button className="moreBtn" type="primary" onClick={ <CharacterDetailBlock id={id}/>}>
                                More...

                                </button>
                            </div>
                        )
                    })}

            </ul>
        <Comment />

        </div>
    );
}

export default Homepage;