import React from 'react';
import { Layout } from 'antd';
import { Card, Button } from 'react-bootstrap'
import './FrontPage.css';
import './FrontPage1.css';
import svg from './icon.svg';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const { Header, Footer, Content } = Layout;
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '30ch',
      marginLeft: '13%',

    },
  },
}));


function FrontPage() {
  const classes = useStyles();

  return (
    <div>
      <Layout>
        <Header style={{color:'white'}} className="header"> <img style={{ marginLeft: '13%', backgroundColor: 'white' }}  src={svg} alt="" /> Company Name </Header>
        <Content className="content">
          <div className="mobileHidden">    <Card

            style={{ width: '25rem', marginLeft: '35%', marginTop: '5%' }}
            className="mb-2"
          >
            <Card.Header style={{ fontSize: 20, fontFamily: 'fantasy', textAlign: 'center', paddingBottom: 20 }}>Sign In</Card.Header>
            <Card.Body>

              <Card.Text>
                <form className={classes.root} Validate autoComplete="off">
                  <TextField id="outlined-basic" required label="Username" variant="outlined" />
                  <TextField id="outlined-basic" required label="Password" type="password" variant="outlined" />

               <Button style={{ marginTop: 25 }} type="submit" variant="primary">Sign In</Button>
                </form>

              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          <div className="mobileVisible">    <Card

            style={{ width: '23rem', marginLeft: '6%', marginTop: '8%',maxWidth:'87%' }}
            className="mb-2"
          >
            <Card.Header style={{ fontSize: 20, fontFamily: 'fantasy', textAlign: 'center', paddingBottom: 20 }}>Sign In</Card.Header>
            <Card.Body>

              <Card.Text>
                <form style={{marginLeft:'-7.5%',maxWidth:'100%'}} className={classes.root} Validate autoComplete="off">
                  <TextField id="outlined-basic" required label="Username" variant="outlined" />
                  <TextField id="outlined-basic" required label="Password" type="password" variant="outlined" />

                  <Button style={{ marginTop: 25, maxWidth: '100%' }} type="submit" variant="primary">Sign In</Button>
                </form>

              </Card.Text>
            </Card.Body>
          </Card></div>



        </Content>
        <Footer  >Footer</Footer>
      </Layout>
    </div>
  )
}

export default FrontPage


