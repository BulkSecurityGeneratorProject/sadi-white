import React, { Component } from 'react'
import {
  Col,
  Table
} from 'react-bootstrap'

import { connect } from 'react-redux'
import Card from 'components/Card/Card'
import { getAllResult } from '../../actions/authentication-actions'

class TopScorers extends Component {
  constructor(props) {
    super(props)
    this.thArray = ['Test Name', 'First Name', 'Last Name', 'Mark']
    this.props.getAllResult()
  }

  render() {
    return(
      <Col md={12}>
        <Card
          title="All Results"
          ctTableFullWidth
          ctTableResponsive
          content={
            <Table striped hover>
              <thead>
              <tr>
                {this.thArray.map((prop, key) => (
                  <th key={key}>{prop}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {
                this.props.listResult.slice(0,3).map((prop, key) => (
                  <tr key={key}>
                    <td>{prop['testName']}</td>
                    <td>{prop['firstName']}</td>
                    <td>{prop['lastName']}</td>
                    <td>{prop['numberOfCorrectAnswer'] / prop['size'] * 100} % </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          }
        />
      </Col>
    )
  }
}

function mapStateToProps(state) {
  return {
    listResult: state.allResult,
  };
}

export default connect(mapStateToProps, { getAllResult })(TopScorers);

