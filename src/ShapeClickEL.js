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

import GpxFactory from './GpxFactory.js';
import theUserData from './UserData.js';

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
 * Coming soon...
 */
/* ------------------------------------------------------------------------------------------------------------------------- */

class ShapeClickEL {

	/**
	 * Coming soon...
	 * @type {String}
	 */

	#shapeId;

	/**
	 * The constructor
	 * @param {String} shapeId Coming soon
	 */

	constructor ( shapeId ) {
		this.#shapeId = shapeId;
		Object.freeze ( this );
	}

	/**
	 * Coming soon...
	 * @param {Object} result Coming soon
	 */

	#parseResponse ( result ) {
		new GpxFactory ( this.#shapeId, result );
	}

	/**
	 * Coming soon...
	 */

	handleEvent ( ) {
		document.querySelectorAll ( '.gtfsweb-buttonShape' ).forEach (
			element => {
				element.classList.remove ( 'gtfsweb-selected' );
			}
		);
		document.getElementById ( 'gtfsweb-button-shape' + this.#shapeId ).classList.add ( 'gtfsweb-selected' );
		fetch ( 'SelectGpxPoints.php?network=' + theUserData.network + '&shapeId=' + this.#shapeId )
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

export default ShapeClickEL;

/* --- End of file --------------------------------------------------------------------------------------------------------- */