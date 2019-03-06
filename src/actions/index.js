


import _ from 'lodash';

import jsonPlaceholder from '../apis/jsonPlaceholder';



// combo action creator. mega jumbo action creator
// dispatch and getState are redux args
export const fetchPostsAndUsers = () => async ( dispatch, getState ) => {

	// await syntax to make sure this completes firt
	await dispatch( fetchPosts() );

	// iterate thru posts, pull off unique userIds only
	// lodash chain syntax
	_.chain( getState().posts )
		.map( 'userId' )
		.uniq()
		.forEach( id => {
			dispatch( fetchUser( id ) );
		}).value()


	// unchained syntax. django unchained
	/*const userIds = _.uniq( _.map( getState().posts, 'userId' ) );

	userIds.forEach( id => {

		dispatch( fetchUser(id) );

	});*/

};



export const fetchPosts = () => {

	// for use with thunk. function gets dispatch, getState
	// thunk eventually allows us to manually dispatch

	// thunk is what allows us to use async syntax here

	// additionally, we are not using getState so no need to pass it
	return async dispatch => {

		const response = await jsonPlaceholder.get( '/posts' );

		dispatch({
			type: 'FETCH_POSTS',
			payload: response.data
		});

	};

};



export const fetchUser = id => async dispatch => {

	const response = await jsonPlaceholder.get( `/users/${ id }` );

	dispatch({
		type: 'FETCH_USER',
		payload: response.data
	});	

};



// HERE WE DID THING THE LODASH MEMOIZE WAY. I LIKED IT
// I'M LEAVING IT HERE BECAUSE I LIKED IT

// refactored to extract network call to use memoize
/*const _fetchUser = _.memoize( async ( id, dispatch ) => {

	const response = await jsonPlaceholder.get( `/users/${ id }` );

	dispatch({
		type: 'FETCH_USER',
		payload: response.data
	});	

});

// funky syntax for inner functions. dunno.
export const fetchUser = id => dispatch => {

		_fetchUser( id, dispatch );

};*/








