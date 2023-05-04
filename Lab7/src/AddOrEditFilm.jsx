/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { useState } from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap';


import { useNavigate, useParams} from "react-router-dom";

function AddOrEdit(props){
    const {id} = useParams();
    let film; 
    if(!(id===undefined))
        film = props.films.find(film=> film.ID==id);


    const navigate = useNavigate();

    const [name, setName] = useState((!(id===undefined))?film.Title:'');
    const [favorite, setFavorite] = useState((!(id===undefined))?film.isFavorite:false);
    const [rating, setRating] = useState((!(id===undefined))?film.Rating:0);
    const [date, setDate] = useState((!(id===undefined))?film.Date:dayjs().format('YYYY-MM-DD'));
    const [error, setError] = useState(false);

    function handleAdd(){
        if(name==""||name==''||name==" "||name.lenght==0||name==null){
            setError(true)
        }
        else{
            setError(false)
            props.handleAdd(name, favorite, date, rating);
            navigate('/');
        }
    }

    function handleSave(){
        if(name==""||name==''||name==" "||name.lenght==0||name==null){
            setError(true)
        }
        else{
            setError(false)
            console.log('date' + date);
            props.handleSave(id, name, favorite, date, rating);
            navigate('/');
        }
    }

    function handleCancel(){
        navigate('/');
    }

    return <Table>
        <tbody>
            <td>
            <Row>
                <Form.Group controlId="FilmName">
                        <Form.Label className='fw-light'>Film Name</Form.Label>
                        {id===undefined && <Form.Control type="text" className={(error==false)?"":"form-square border border-danger"} onChange={(ev)=>{setName(ev.target.value)}} name="Title" placeholder="Enter Film Name" />}
                        {!(id===undefined) && <Form.Control type="text" className={(error==false)?"":"form-square border border-danger"} onChange={(ev)=>{setName(ev.target.value)}} name="Title" value={name} />}
                    </Form.Group>
            </Row>
            <Row>
                <Col xs={8}>
                    <Form.Group controlId="Insert watch date">
                        <Form.Label className='fw-light'>Enter watch date</Form.Label>
                        {id===undefined  && <Form.Control type="date" onChange={(ev)=>{setDate(ev.target.value)}} name="date"/>}
                        {!(id===undefined)  && <Form.Control type="date" onChange={(ev)=>{setDate(ev.target.value)}} name="date" value={(date=='undefined')?'':date.format("YYYY-MM-DD")}/>} 
                        {/*placeholder={(date=='undefined')?'':String(date.format*(AAAA/MM/DD))}*/}
                        </Form.Group>
                </Col>
                <Col  xs={4}>
                    <Form.Group controlId="Rating">
                        <Form.Label className='fw-light'>Rating</Form.Label>
                        {id===undefined&& <Form.Control type="number" min="0" max="5"  onChange={(ev)=>{setRating(ev.target.value)}} name="rating" placeholder="0" />}
                        {!(id===undefined)  && <Form.Control type="number" min="0" max="5"  onChange={(ev)=>{setRating(ev.target.value)}} name="rating" value={rating} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group controlId="isFavorite">
                    <Col sm="4">
                    {id===undefined&& <Form.Check type="checkbox" onChange={(ev)=>{setFavorite(ev.target.value)}} label='Is one of your favorite?' name="fav"/>}
                    {!(id===undefined)  && (favorite==true || favorite=='on') && <Form.Check type="checkbox"  label='Is one of your favorite?' onChange={(ev)=>{setFavorite(ev.target.value)}} name="fav" checked></Form.Check>}
                    {!(id===undefined)  && !(favorite==true || favorite=='on') && <Form.Check type="checkbox" label='Is one of your favorite?' onChange={(ev)=>{setFavorite(ev.target.value)}}  name="fav"></Form.Check>}
                    </Col>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="addButton">
                    <Form.Label className='fw-light'>&nbsp;</Form.Label><br/>
                    {id===undefined && <Button variant='success' id="addbutton" onClick={handleAdd}>ADD</Button>}
                    {!(id===undefined) && <Button variant='success' id="addbutton" onClick={handleSave}>SAVE</Button>}
                    {' '}<Button variant='secondary' id="addbutton" onClick={handleCancel}>CANCEL</Button>
                </Form.Group>
            </Row>
            </td>
        </tbody>
    </Table>
}
     
export {AddOrEdit}