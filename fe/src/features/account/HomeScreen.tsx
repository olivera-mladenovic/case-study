import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Grid, Header, Image, Segment } from "semantic-ui-react";

export const HomeScreen: React.FC = () =>  {
    const navigate =useNavigate();
    return (
        <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>
    
          <Grid.Row verticalAlign='middle' as='a'>
            <Grid.Column>
              <Header icon>
              <Image src='/signin.png' wrapped />
              </Header>
              <Button content='Login' onClick={()=> navigate('/login')} color="orange"></Button>
            </Grid.Column>
    
            <Grid.Column>
              <Header icon>
              <Image src='/signup.png' wrapped  />
              </Header>
              <Button content='Register' onClick={()=> navigate('/register')} color="purple"></Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
}