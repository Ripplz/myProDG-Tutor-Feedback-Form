import React from 'react';
import { Field } from 'react-final-form';

const MultiInputEntry = ( {label, name} ) => 
	<div className="form-group">
		<label>{label}</label>
	    <Field name={name} component="textarea" className={`form-control col-12`} />
	</div>
	
export default MultiInputEntry