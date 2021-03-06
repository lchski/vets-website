import React from 'react';
import { connect } from 'react-redux';

import DateInput from '../form-elements/DateInput';
import ErrorableCheckbox from '../form-elements/ErrorableCheckbox';
import { updateReviewStatus, veteranUpdateField } from '../../actions';

/**
 * Props:
 * `isSectionComplete` - Boolean. Marks the section as completed. Provides styles for completed sections.
 * `reviewSection` - Boolean. Hides components that are only needed for ReviewAndSubmitSection.
 */
class MedicareMedicaidSection extends React.Component {
  render() {
    let content;
    let editButton;
    let medicarePartA;

    if (this.props.data.isEnrolledMedicarePartA) {
      medicarePartA = (<tr>
        <td>If so, what is your Medicare Part A effective date?:</td>
        <td>{this.props.data.medicarePartAEffectiveDate.month}
        /{this.props.data.medicarePartAEffectiveDate.day}/
        {this.props.data.medicarePartAEffectiveDate.year}</td>
      </tr>);
    }

    if (this.props.isSectionComplete && this.props.reviewSection) {
      content = (<table className="review usa-table-borderless">
        <tbody>
          <tr>
            <td>Are you eligible for Medicaid?:</td>
            <td>{`${this.props.data.isMedicaidEligible ? 'Yes' : 'No'}`}</td>
          </tr>
          <tr>
            <td>Are you enrolled in Medicare Part A (hospital insurance):</td>
            <td>{`${this.props.data.isEnrolledMedicarePartA ? 'Yes' : 'No'}`}</td>
          </tr>
          {medicarePartA}
        </tbody>
      </table>);
    } else {
      content = (<div className="input-section">
        <ErrorableCheckbox
            label="Are you eligible for Medicaid?"
            checked={this.props.data.isMedicaidEligible}
            onValueChange={(update) => {this.props.onStateChange('isMedicaidEligible', update);}}/>
        <div>Medicaid is a United States Health program for eligible individuals and
        families with low income and resources.</div>
        <ErrorableCheckbox
            label="Are you enrolled in Medicare Part A (hospital insurance)"
            checked={this.props.data.isEnrolledMedicarePartA}
            onValueChange={(update) => {this.props.onStateChange('isEnrolledMedicarePartA', update);}}/>
        <div>Medicare is a social insurance program administered by the United
        States government, providing health insurance coverage to people aged
        65 and over, or who meet special criteria.</div>
        <DateInput label="If so, what is your Medicare Part A effective date?"
            day={this.props.data.medicarePartAEffectiveDate.day}
            month={this.props.data.medicarePartAEffectiveDate.month}
            year={this.props.data.medicarePartAEffectiveDate.year}
            onValueChange={(update) => {this.props.onStateChange('medicarePartAEffectiveDate', update);}}/>
      </div>);
    }

    if (this.props.reviewSection) {
      editButton = (<ErrorableCheckbox
          label={`${this.props.isSectionComplete ? 'Edit' : 'Update'}`}
          checked={this.props.isSectionComplete}
          className="edit-checkbox"
          onValueChange={(update) => {this.props.onUIStateChange(update);}}/>
      );
    }
    return (
      <div>
        <h4>Medicare/Medicaid</h4>
        {editButton}
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.veteran.medicareMedicaid,
    isSectionComplete: state.uiState.completedSections['/insurance-information/medicare-medicaid']
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStateChange: (field, update) => {
      dispatch(veteranUpdateField(['medicareMedicaid', field], update));
    },
    onUIStateChange: (update) => {
      dispatch(updateReviewStatus(['/insurance-information/medicare-medicaid'], update));
    }
  };
}

// TODO(awong): Remove the pure: false once we start using ImmutableJS.
export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(MedicareMedicaidSection);
export { MedicareMedicaidSection };
