import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import {connect} from 'react-redux';
import {Button, Label, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';

export function ManuelState({isOpen}) {
    return <Button bsStyle={isOpen ? 'success' : 'danger'}>{isOpen ? 'Open' : 'Closed'}</Button>
}

export function AutoState({isOpen}) {
    return <h4><Label bsStyle={isOpen ? 'success' : 'danger'}>{isOpen ? 'Open' : 'Closed'}</Label></h4>
}

export function Comment({comment}) {
    return (
        <FormGroup controlId="formControlsTextarea">
            <FormControl componentClass="textarea" placeholder="" value={comment}/>
        </FormGroup>
    );
}

export function Tickets({tickets}) {
    return (
        <Grid>
            {tickets.map(ticket => {
                return <Row key={ticket}><Col>{ticket}</Col></Row>
            })}
        </Grid>
    );
}

export class Gate extends React.Component {
    render() {
        const {manual_state, auto_state, comment, tickets} = this.props;
        return (
            <Grid>
                <Row>
                    <Col xs={4} md={2}>
                        <Row>
                            <ManuelState isOpen={manual_state}/>
                        </Row>
                        <Row>
                            <AutoState isOpen={auto_state}/>
                        </Row>
                    </Col>
                    <Col xs={2} md={4}>
                        <Comment comment={comment}/>
                    </Col>
                </Row>
                <Row>
                    <Col><Tickets tickets={tickets}/></Col>
                </Row>
            </Grid>
        );
    }
}

Gate.propTypes = {
    group: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    comment: PropTypes.string,
    manual_state: PropTypes.bool,
    auto_state: PropTypes.bool,
    tickets: PropTypes.array,
    last_modified_state: PropTypes.string,
    last_modified_comment: PropTypes.string
};

const defaultValues = {
    group: '',
    service: '',
    environment: '',
    comment: '',
    manual_state: true,
    auto_state: true,
    tickets: [],
    last_modified_state: "",
    last_modified_comment: ""
};

const mapStateToProps = (state, initialProps) => {
    const gate_from_state = R.path(['gates', initialProps.group, initialProps.service, initialProps.environment])(state);
    return R.mergeAll([defaultValues, initialProps, gate_from_state]);
};

export default connect(mapStateToProps)(Gate);