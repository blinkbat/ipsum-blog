

import React from 'react';
import { connect } from 'react-redux';



class UserHeader extends React.Component {

	render() {

		const { user } = this.props;

		if( !user ) { return null; }

		return <div>{ user.name }</div>;

	}

}



// here we've refactored our list combing into mapStateToProps
// ownProps is a reference to above component's props
// this is built-in with redux (I think :D)

const mapStateToProps = ( state, ownProps ) => {

	return { user: state.users.find( user => user.id === ownProps.userId ) };

}



export default connect( mapStateToProps )( UserHeader );