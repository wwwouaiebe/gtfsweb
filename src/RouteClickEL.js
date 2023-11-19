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

import ShapeClickEL from './ShapeClickEL';

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

	#network;

	/**
	 * Coming soon...
	 * @type {String}
	 */

	#routeId;

	/**
	 * The constructor
	 * @param {String} network Coming soon
	 * @param {String} routeId Coming soon
	 */

	constructor ( network, routeId ) {
		this.#network = network;
		this.#routeId = routeId;
		Object.freeze ( this );
	}

	/**
	 * Coming soon...
	 * @param {Object} result Coming soon
	 */

	#parseResponse ( result ) {
		let mainDivElement = document.getElementById ( 'gtfs-trip' );
		while ( mainDivElement.firstChild ) {
			mainDivElement.removeChild ( mainDivElement.firstChild );
		}
		result.forEach (
			trip => {
				let divElement = document.createElement ( 'div' );
				divElement.innerText = trip.shape_id;
				divElement.classList.add ( 'gtfsweb-button' );
				divElement.classList.add ( 'gtfsweb-buttonShape' );
				divElement.id = 'gtfsweb-button-shape' + trip.shape_id;
				divElement.addEventListener ( 'click', new ShapeClickEL ( this.#network, trip.shape_id ) );
				mainDivElement.appendChild ( divElement );
			}
		);
	}

	/**
	 * Coming soon...
	 */

	handleEvent ( ) {
		document.querySelectorAll ( '.gtfsweb-buttonRoute' ).forEach (
			element => {
				element.classList.remove ( 'gtfsweb-selected' );
			}
		);
		document.getElementById ( 'gtfsweb-button-route' + this.#routeId ).classList.add ( 'gtfsweb-selected' );
		fetch ( 'SelectShapes.php?network=' + this.#network + '&route=' + this.#routeId )
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