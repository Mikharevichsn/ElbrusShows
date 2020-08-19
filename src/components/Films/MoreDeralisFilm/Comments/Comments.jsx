import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setComments } from '../../../../redux/action';
import { useParams } from 'react-router-dom';
import { UncontrolledTooltip, Container } from 'reactstrap';

import {
  Row,
  Col,
  ListGroup,
  ListGroupItemHeading,
  ListGroupItem,
} from 'reactstrap';
import actor from '../../../../public/img/actor.png';
import writer from '../../../../public/img/writer.png';
import popcorn from '../../../../public/img/popcorn.png';

const Comments = () => {
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.user);
const [ratingSum, setRatingSum] = useState(0)

  const dispatch = useDispatch();
  const filmIdParams = useParams().id;

  useEffect(() => {
    dispatch(setComments(filmIdParams));
  }, [dispatch, filmIdParams]);


 const checkRating = (actor, scenario, general) => {
  console.log(actor)

   console.log( (Number(actor) + Number(scenario) + Number(general)))
   return (Number(actor) + Number(scenario) + Number(general))
 }

 const setColor = (num) => num >= 10 ? 'success' : 'warning'

 

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{color: 'orange'}}>Рецензии</h2>
        </Col>
      </Row>

      {comments &&
        comments.map((el, i) => (
          <>
              <ListGroup style={{padding: '20px'}}>
                <ListGroupItem color='info' ><h4>Здесь Имя</h4></ListGroupItem>
                {console.log(el.rating.actor)}
                  <ListGroupItem color={ el.result} >{el.post}</ListGroupItem>
                
                  <ListGroupItem color={ el.result}>
                    <img
                      src={actor}
                      alt="actor-icon"
                      style={{ width: '3%' }}
                      id="Actor"
                    />
                    <UncontrolledTooltip placement="top" target="Actor">
                      Актерская игра
                    </UncontrolledTooltip>
                    {el.rating && el.rating.actors === ''
                    ? 'Не оценил' : el.rating.scenario}
                    /5
                    <img
                      src={writer}
                      alt="writer-icon"
                      style={{ width: '3%' }}
                      id="Writer"
                    />{' '}
                    <UncontrolledTooltip placement="top" target="Writer">
                      Сценарий
                    </UncontrolledTooltip>
                    {el.rating && el.rating.actors === ''
                      ? 'Не оценил'
                      : `${el.rating.actors}`}
                    /5{' '}
                    <img
                      src={popcorn}
                      alt="writer-icon"
                      style={{ width: '3%' }}
                      data-toggle="tooltip"
                      id="general"
                    />
                    <UncontrolledTooltip placement="top" target="general">
                      Общее впечатление
                    </UncontrolledTooltip>
                    :
                    {el.rating && el.rating.general === ''
                      ? 'Не оценил'
                      : el.rating.general}
                    /5
                  </ListGroupItem>
              </ListGroup>
        
          </>
        ))}
    </Container>
  );
};

export default Comments;
