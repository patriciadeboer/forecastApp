import React from 'react'
import {connect} from 'react-redux'

export const FavCities = (props) => {
  return (
    <div>
      {console.log(props.favCities)}
      {/* {props.favCities.map(city=>(
        city
      ))} */}
    </div>
  )
}
const mapState = state=>{
  return {favCities: state.favCities.cities}
}

export default connect(mapState)(FavCities)
