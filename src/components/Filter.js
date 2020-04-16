import React from "react";
import icon from "./icons8-filter-mod.png";
import "./Filter.css";
import {
  OverlayTrigger,
  Popover,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { connect } from "react-redux";
import { setToggleState } from "../actions";

export class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    if (event.target.id === "filtered") {
      this.props.dispatch(setToggleState("filtered", !this.props.filtered));
    } else if (event.target.id === "ada") {
      this.props.dispatch(setToggleState("handicap", !this.props.handicap));
    } else console.log("error with toggle");
  }

  render() {
    return (
      <div>
        <OverlayTrigger
          trigger="click"
          key="top"
          placement="top"
          overlay={
            <Popover id="popover-basic">
              <Popover.Content>
                {/* // Legend button filters for tap type */}
                <Row>
                  <Col>
                    <Row className="legendRow">
                      <p className="tapName">PUBLIC</p>
                      <div>
                        <img
                          className="tapIcon"
                          src="https://i.imgur.com/M12e1HV.png"
                          alt="blue"
                          // onClick={() => this.props.legendButton("Public")}
                        ></img>
                      </div>
                    </Row>
                    <Row className="legendRow">
                      <p className="tapName">SHARED</p>
                      <div>
                        <img
                          className="tapIcon"
                          src="https://i.imgur.com/DXMMxXR.png"
                          alt="green"
                          // onClick={() => this.props.legendButton("Private-Shared")}
                        ></img>
                      </div>
                    </Row>
                    <Row className="legendRow">
                      <p className="tapName">PRIVATE</p>
                      <div>
                        <img
                          className="tapIcon"
                          src="https://i.imgur.com/kt825XO.png"
                          alt="yellow"
                          // onClick={() => this.props.legendButton("Private")}
                        ></img>
                      </div>
                    </Row>
                    <Row className="legendRow">
                      <p className="tapName">RESTRICTED</p>
                      <div>
                        <img
                          className="tapIcon"
                          src="https://i.imgur.com/5NOdOyY.png"
                          alt="red"
                          // onClick={() => this.props.legendButton("Restricted")}
                        ></img>
                      </div>
                    </Row>
                  </Col>
                  {/* Toggle Switches */}
                  <Col>
                    <Row className="legendRow filterRow">
                      <Form.Check.Label>Open Now</Form.Check.Label>
                      <Form.Check
                        type="switch"
                        id="openNow"
                        label=""
                        onClick={e => this.handleChange(e)}
                      />
                    </Row>

                    <Row className="legendRow filterRow">
                      <Form.Check.Label>ADA Accessible</Form.Check.Label>
                      <Form.Check
                        type="switch"
                        id="ada"
                        label=""
                        onClick={e => this.handleChange(e)}
                      />
                    </Row>

                    <Row className="legendRow filterRow">
                      <Form.Check.Label>Filtered Water</Form.Check.Label>
                      <Form.Check
                        type="switch"
                        id="filtered"
                        label=""
                        onClick={e => this.handleChange(e)}
                      />
                    </Row>

                    <Row className="legendRow filterRow">
                      <Form.Check.Label>Sparkling Water</Form.Check.Label>
                      <Form.Check
                        type="switch"
                        id="sparkling"
                        label=""
                        onClick={e => this.handleChange(e)}
                      />
                    </Row>
                  </Col>
                </Row>
              </Popover.Content>
            </Popover>
          }
        >
          <img
            src={icon}
            alt="filterImg"
            className="filterIcon"
            //   onClick={this.display}
          />
        </OverlayTrigger>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filtered: state.filtered,
  handicap: state.handicap
});

export default connect(mapStateToProps)(Filter);
