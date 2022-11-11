import React from 'react'
import { Grid } from 'semantic-ui-react'
import { CardContent } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'

import './About.css'

const About = () => {
  return (
  <>
    <div className='Content_about'>
      <div className='H1_about'> Meet Our Team! </div>
    </div>

    <div>
      <Card centered style={{width:"40%"}}>
        <CardContent>
          <Card.Header>Ruozhen Yang</Card.Header>
          <Card.Meta>Project Manager</Card.Meta>
          <Card.Description>Computer Science, ruozhen2@illinois.edu </Card.Description>
        </CardContent>
      </Card>
      <Card centered style={{width:"40%"}}>
        <CardContent>
          <Card.Header>Kangyu Feng</Card.Header>
          <Card.Meta>Project Designer</Card.Meta>
          <Card.Description>Computer Science, kangyuf2@illinois.edu </Card.Description>
        </CardContent>
      </Card>
      <Card centered style={{width:"40%"}}>
        <CardContent>
          <Card.Header>Patrick Xu</Card.Header>
          <Card.Meta>Software Developer</Card.Meta>
          <Card.Description>Computer Science, xx19@illinois.edu </Card.Description>
        </CardContent>
      </Card>
      <Card centered  style={{width:"40%"}}>
        <CardContent>
          <Card.Header>Justin Gao</Card.Header>
          <Card.Meta>Software Developer</Card.Meta>
          <Card.Description>Computer Engineering, junjieg2@illinois.edu </Card.Description>
        </CardContent>
      </Card>
      <Card centered  style={{width:"40%"}}>
        <CardContent>
          <Card.Header>Jeffrey Zhai</Card.Header>
          <Card.Meta>Software Developer</Card.Meta>
          <Card.Description>Computer Science + Mathematics, zhai11@illinois.edu </Card.Description>
        </CardContent>
      </Card>
      <Card centered  style={{width:"40%"}}>
        <CardContent>
          <Card.Header>Edison Yin</Card.Header>
          <Card.Meta>Software Developer</Card.Meta>
          <Card.Description>PREP, yimingy9@illinois.edu </Card.Description>
        </CardContent>
      </Card>
    </div>

  </>
  )
}

export default About
