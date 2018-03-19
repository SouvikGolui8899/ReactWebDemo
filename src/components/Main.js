import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import {getProperties} from '../Logic/requestAPI';

const styles={
  property : {
    width: '50%',
    padding: 50,
    maxHeight: 200
  }
}
export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      properties : []
    }
  }

  renderProperties = () => {
    getProperties().then(res=>{
      console.log(res);
      this.setState({properties:res.data.property_data});
    }).catch(err=>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.renderProperties();
  }
  
  handleClick(property) {
	const myWindow = window.open();
	const propertyType = property.type !== "" ? "<p style='font-size: 1.5em;text-align: center;'><b>Type:</b> "+property.type+"</p>":"";
	myWindow.document.write(
	"<p style='font-size: 1.875em'> "+property.headline+"</p>"+
	'<img style="display:block;margin-left:auto;margin-right:auto;width:60%;" src='+property.picture_large+' alt="property"/>'+
	"<p style='font-size:1.5em;text-align: center;'><b>Title:</b> "+property.title+"</p>"+
	"<p style='font-size: 1.5em;text-align: center;'><b>Address:</b> "+ property.address + "</p>"+
	propertyType+
	"<p style='font-size: 1.5em'><b>Property Highlights</b></p>"+
	"<p style='font-size: 1.5em'>"+
	"<ul style='font-size: 1.5em'>"+
	  "<li style='font-size: 1.5em>"+"Bedrooms: "+property.floorplan.bedrooms+"</li>"+
	  "<li style='font-size: 1.5em>"+"Bathrooms: "+property.floorplan.bathrooms+"</li>"+
	"</ul>"+
	"</p>"+
	"<p style='font-size: 1.5em'><b>Property:</b> #"+property.id+"</p>"+
	'<a href="'+property.application_url+'"><p style="font-size: 1.5em">Apply</p></a>'
	);
  }

  render(){
    return(
      <div>
        <Grid container>
          {
            this.state.properties.map(property=>{
              return (
                <Grid key={property.id} item xs={12} sm={6}>
				  <img style={styles.property} src={property.picture} alt="property" onClick={() => this.handleClick(property)}/>
				  <p><b>Title:</b> {property.title} </p>
				  <p><b>Address:</b> {property.address} </p>
				 {property.type !== "" ? <p><b>Type:</b> {property.type} </p> : ""}
                </Grid>
              )
            })
          }
          <Grid item xs={6}>
          One
          </Grid>
          <Grid item xs={6}>
          Two
          </Grid>
          <Grid item xs={6}>
          Three
          </Grid>
          <Grid item xs={6}>
          Four
          </Grid>
          <Grid item xs={6}>
          </Grid>
        </Grid>
      </div>
    )
  }
}