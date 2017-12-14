import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {
  Col, Button, Form, FormGroup, HelpBlock, FormControl, ControlLabel, Panel, PanelGroup, Row
} from 'react-bootstrap';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type={type} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
);

const renderAnswers = ({ fields, meta: { error } }) => (
  <div>
    <div>
      <Button bsStyle='primary' onClick={() => fields.push()}>Add Answer</Button>
    </div>
    {fields.map((answer, index) => (
      <div key={index}>
        <Col md={10}>
          <Field
            name={`${answer}.content`}
            type="text"
            component={renderField}
            label={`Answer #${index + 1}`}
          />
        </Col>
        <Col md={2}>
          <Button
            bsStyle='danger'
            type="button"
            title="Remove Answer"
            onClick={() => fields.remove(index)}>Delete Answer</Button>
        </Col>
        <Col md={12}>
          <label>
            <Field name={`${answer}.isCorrectAnswer`} component='input' type='radio' value='true'/>{' '} True Answer
          </label>{' '}
          <label>
            <Field name={`${answer}.isCorrectAnswer`} component='input' type='radio' value='false'/>{' '} False Answer
          </label>
        </Col>
      </div>
    ))}
    {error && <HelpBlock className="error">{error}</HelpBlock>}
  </div>
);

const renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
  <FormGroup>
    <Col md={2}>
      <Button bsStyle='primary' onClick={() => fields.push({})}>Add Questions</Button>
      {(touched || submitFailed) && error && <HelpBlock>{error}</HelpBlock>}
    </Col>
    <Col md={10}>
      {fields.map((question, index) => (
        <PanelGroup defaultActiveKey={index} accordion>
          <Panel header={`Question ${index+1}`} eventKey={index}>
					<Col md={10}>
            <Field
              name={`${question}.content`}
              type="text"
              component={renderField}
              label="Enter a question." />
					</Col>
					<Col md={2}>
						<Button
							bsStyle='danger'
							type="button"
							title="Remove Question"
							onClick={() => fields.remove(index)}>Delete Question</Button>
					</Col>
					<Col md={12}>
						<FieldArray name={`${question}.answer`} component={renderAnswers} />
					</Col>
          </Panel>
        </PanelGroup>
      ))}
    </Col>
  </FormGroup>
);

const FieldArraysForm = props => {
  const { handleSubmit, onClose } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Test Name"
      />
      <Field
        name="duration"
        type="text"
        component={renderField}
        label="Test Duration"
      />
      <FieldArray name="questions" component={renderQuestions} />
			<div className="clearfix"></div>
      <Row>
        <Col className="col-md-12">
        <Button bsStyle="danger" className="pull-right" onClick={onClose}>
          Close
        </Button>{' '}
        <Button bsStyle="primary" className="pull-right" onClick={handleSubmit}>
          Save
        </Button>
        </Col>
      </Row>

    </Form>
  );
};

export default reduxForm({
  form: 'createTest', // a unique identifier for this form
  validate,
})(FieldArraysForm);

