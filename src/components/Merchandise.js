import React, { useState, useEffect } from "react";
import { Card, Icon, Item, Image, Rating } from "semantic-ui-react";
import faker from "faker";
import axios from "axios";


const Merchandise = ({ merchandise, setMerchandise, searchTerm }) => {

  console.log('searchTerm:', searchTerm.value.length);

  useEffect(() => {

    if (searchTerm.value.length) {
      console.log('entered component Merch searchTerm');
      try {
        axios.post('/api/merchandise/search', searchTerm)
        .then((res)=>{
          const results = res.data.data;
          if (results) {
            setMerchandise(results);
          }
        })
       
        
      } catch (error) {
        throw error;
      }
    
    }else{
      console.log('Entered comp Merch getAll');
      try {
        axios.get('/api/merchandise')
      .then((res) => {

        const merch = res.data.merch;
        return setMerchandise(merch)
      })
      } catch (error) {
        throw error;
      }
      
    }

  }, [searchTerm])

  return (
    <Card.Group itemsPerRow={4} style={{ marginTop: '1em' }}>
      {merchandise.map((item) => {
        return (
          <Card key={item.merch_id}>
            <Image src='http://placeimg.com/300/300/nature' wrapped ui={false} />
            <Card.Content>
              <Card.Header>{item.name}</Card.Header>
              <Card.Meta>
                {item.price}
              </Card.Meta>
              <Card.Description>
                {item.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Rating icon='star' defaultRating={3} maxRating={4} />
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>

  )

}

export default Merchandise;