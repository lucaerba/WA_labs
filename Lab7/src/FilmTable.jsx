/* eslint-disable react/prop-types */
import { Button, Col, Form, Table} from 'react-bootstrap';
import { StarFill, Star, Trash, PencilSquare} from "react-bootstrap-icons";
import {Filters} from "./Filter"
import { useNavigate, useParams } from "react-router-dom";
import { StarRating } from './StarRating';
import dayjs from 'dayjs';
import "./Table.css"
import { AddFilm } from './AddFilm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap/esm';


function FilmTable(props) {
    const {filterName} = useParams();
    const navigate = useNavigate();

    function handleEdit(id) {
        navigate(`/editFilm/${id}`);
    }
    const handleDelete = (id) => {
        props.deleteFilm(id);
    }
    const handleChangePreference = (id) => {
        //console.log("handle Preference " + id)
        props.changePreference(id);
    }

    if (props.films) {
        return (<>
            <div className='centerTable'>
                <Row>
                    <Col sm={4} >
                        <Filters/>
                    </Col>
                    <Col sm={8}>
                        <FilmDetails films={props.films} activeFilter={filterName} handleEdit={handleEdit} handleDelete={handleDelete} handleChangePreference={handleChangePreference} changeRating={props.changeRating}/>
                    </Col>
                </Row>
            </div> 
        </>)
    }
}
function FilmDetails(props) {
    return <>
        <Table >
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Favorite?</th>
                    <th scope="col">Date</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                {props.films.map(f => <FilmFiltered key={f.ID} film={f} activeFilter={props.activeFilter} handleEdit={props.handleEdit} handleDelete={props.handleDelete}  handleChangePreference={props.handleChangePreference} changeRating={props.changeRating}/>)}
            </tbody>
        </Table>
        <AddFilm/>
    </>
}


function FilmFiltered(props) {
    const date = dayjs();
    if(props.activeFilter==null || (props.activeFilter==='favorite' && props.film.isFavorite) ||(props.activeFilter==='bestRated' && props.film.Rating==5)||
    (props.activeFilter==='recentlySeen' && (date.diff(props.film.Date, 'month')<1)) || (props.activeFilter==='unseen' && props.film.Date==='undefined'))
        return (<><tr><FilmRow film={props.film} handleDelete={props.handleDelete} handleChangePreference={props.handleChangePreference} changeRating={props.changeRating}/></tr></>)
    
}


function FilmRow(props){
    const navigate = useNavigate();
    return (<>
            <td>{props.film.Title}</td>
            <td><DisplayFav film={props.film} handleChangePreference={props.handleChangePreference}/> </td>
            <td>{((props.film.Date=='Invalid Date')||(props.film.Date=='undefined')||(props.film.Date===undefined)||(!dayjs(props.date).isValid))?' ':(props.film.Date.format('YYYY/MM/DD'))}</td>
            <td>{<StarRating film={props.film} changeRating={props.changeRating}/>}</td>
            <td><Button variant='primary' className='button-del-edit' onClick={()=>{navigate(`/edit/${props.film.ID}`)}}>{<PencilSquare/>}</Button></td>
            <td><Button variant='warning' onClick={()=>{props.handleDelete(props.film.ID)}}>{<Trash/>}</Button></td>
    </>)
}

function DisplayFav(props){
    //console.log("Display Favorite " + props.film.isFavorite)
    if(props.film.isFavorite){
        return (<>
            <Form.Group controlId="formBasicCheckBox">
                <Form.Check type="checkbox" defaultChecked onClick={()=>{props.handleChangePreference(props.film.ID)}}/>
            </Form.Group>
        </>
    )}
    else{
        return (<>
            <Form.Group controlId="formBasicCheckBox">
                <Form.Check type="checkbox" onClick={()=>{props.handleChangePreference(props.film.ID)}}/>
            </Form.Group>
        </>
        
    )}
}  
/*
    function RatingStar(props){
        switch (Number(props.film.Rating)){
            case 1:
                return (<>
                    <span><StarFill/><Star/><Star/><Star/><Star/></span>
                </>)
            case 2:
                return (<>
                    <span><StarFill/><StarFill/><Star/><Star/><Star/></span>
                </>)
            case 3:
                return (<>
                     <span><StarFill/><StarFill/><StarFill/><Star/><Star/></span>
                </>)
            case 4:
                return (<>
                    <span><StarFill/><StarFill/><StarFill/><StarFill/><Star/></span>
                </>)
            case 5:
                return (<>
                     <span><StarFill/><StarFill/><StarFill/><StarFill/><StarFill/></span>
                </>)
            default:
                return (<>
                    <span><Star/><Star/><Star/><Star/><Star/></span>
                </>)
        }
    }
*/
export { FilmTable};