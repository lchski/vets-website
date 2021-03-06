import React from 'react';
import _ from 'lodash';

import ErrorableSelect from '../form-elements/ErrorableSelect';
import ErrorableTextInput from '../form-elements/ErrorableTextInput';
import { isValidAddress } from '../../utils/validations';
import { countries, states } from '../../utils/options-for-select';

/**
 * Input component for an address.
 *
 * No validation is provided through a currently stubbed isAddressValid function.
 */
class Address extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.id = _.uniqueId('address-input-');
  }

  // TODO: Look into if this is the best way to update address,
  // it is incredibly slow right now
  handleChange(path, update) {
    const address = {
      street: this.props.value.street,
      city: this.props.value.city,
      country: this.props.value.country,
      state: this.props.value.state,
      zipcode: this.props.value.zipcode
    };

    address[path] = update;

    this.props.onUserInput(address);
  }

  render() {
    const isValid = isValidAddress(
      this.props.value.street,
      this.props.value.city,
      this.props.value.country,
      this.props.value.state,
      this.props.value.zipcode
    );

    let stateList = [];
    const selectedCountry = this.props.value.country;
    if (selectedCountry) {
      stateList = states[selectedCountry];
    }

    return (
      <div className={isValid ? undefined : 'usa-input-error'}>
        <ErrorableTextInput errorMessage={isValid ? undefined : 'Please enter a valid street address'}
            label="Street"
            value={this.props.value.street}
            onValueChange={(update) => {this.handleChange('street', update);}}/>

        <ErrorableTextInput errorMessage={isValid ? undefined : 'Please enter a valid city'}
            label="City"
            value={this.props.value.city}
            onValueChange={(update) => {this.handleChange('city', update);}}/>

        <ErrorableSelect errorMessage={isValid ? undefined : 'Please enter a valid country'}
            label="Country"
            options={countries}
            value={this.props.value.country}
            onValueChange={(update) => {this.handleChange('country', update);}}/>

        <ErrorableSelect errorMessage={isValid ? undefined : 'Please enter a valid state'}
            label="State"
            options={stateList}
            value={this.props.value.state}
            onValueChange={(update) => {this.handleChange('state', update);}}/>

        <ErrorableTextInput errorMessage={isValid ? undefined : 'Please enter a valid ZIP code'}
            label="ZIP Code"
            value={this.props.value.zipcode}
            onValueChange={(update) => {this.handleChange('zipcode', update);}}/>
      </div>
    );
  }
}

export default Address;

