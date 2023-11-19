/*
Copyright - 2023 - wwwouaiebe - Contact: https://www.ouaie.be/

This  program is free software;
you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation;
either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
/*
Changes:
	- v1.0.0:
		- created
*/
/* ------------------------------------------------------------------------------------------------------------------------- */

import ShapeClickEL from './ShapeClickEL.js';
import theUserData from './UserData.js';

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
 * Coming soon...
 */
/* ------------------------------------------------------------------------------------------------------------------------- */

class RouteClickEL {

	/**
	 * Coming soon...
	 * @type {String}
	 */

	#routeId;

	/**
	 * The constructor
	 * @param {String} routeId Coming soon
	 */

	constructor ( routeId ) {
		this.#routeId = routeId;
		Object.freeze ( this );
	}

	/**
	 * Coming soon...
	 * @param {Object} result Coming soon
	 */

	#parseResponse ( result ) {
		theUserData.routeId = this.#routeId;
		let mainDivElement = document.getElementById ( 'gtfs-trip' );
		result.forEach (
			trip => {
				let divElement = document.createElement ( 'div' );
				divElement.innerText = theUserData.routeFullName + ' - ' + trip.shape_id;
				divElement.classList.add ( 'gtfsweb-button' );
				divElement.classList.add ( 'gtfsweb-buttonShape' );
				divElement.id = 'gtfsweb-button-shape' + trip.shape_id;
				divElement.addEventListener ( 'click', new ShapeClickEL ( trip.shape_id ) );
				mainDivElement.appendChild ( divElement );
			}
		);
	}

	/**
	 * Coming soon...
	 * @param {Event} clickEvent the event to handle
	 */

	handleEvent ( clickEvent ) {
		document.querySelectorAll ( '.gtfsweb-buttonRoute' ).forEach (
			element => {
				element.classList.remove ( 'gtfsweb-selected' );
			}
		);
		theUserData.routeFullName = clickEvent.target.innerText;
		clickEvent.target.classList.add ( 'gtfsweb-selected' );
		fetch ( 'SelectShapes.php?network=' + theUserData.network + '&route=' + this.#routeId )
			.then (
				response => {
					// eslint-disable-next-line no-magic-numbers
					if ( 200 === response.status && response.ok ) {
						response.json ( )
							.then ( result => this.#parseResponse ( result ) );
					}
					else {
						console.error ( new Error ( 'Invalid status ' + response.status ) );
					}
				}
			);
	}
}

export default RouteClickEL;

/* --- End of file --------------------------------------------------------------------------------------------------------- */