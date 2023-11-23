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

import AgencyClickEL from './AgencyClickEL.js';
import theUserData from './UserData.js';

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
 * Coming soon...
 */
/* ------------------------------------------------------------------------------------------------------------------------- */

class NetworkClickEL {

	/**
	 * Coming soon...
	 * @type {String}
	 */

	#networkId;

	/**
	 * The constructor
	 * @param {String} networkId Coming soon
	 */

	constructor ( networkId ) {
		this.#networkId = networkId;
		Object.freeze ( this );
	}

	/**
	 * Coming soon...
	 * @param {Object} result Coming soon
	 */

	#parseResponse ( result ) {
		let mainDivElement = document.getElementById ( 'gtfsweb-agencies' );
		let divElement = null;
		if ( result.error ) {
			return;
		}
		result.forEach (
			agency => {
				divElement = document.createElement ( 'div' );
				divElement.innerText = agency.agencyName;
				divElement.classList.add ( 'gtfsweb-button' );
				divElement.classList.add ( 'gtfsweb-buttonAgency' );
				divElement.id = 'gtfsweb-button-agency' + agency.agencyPk;
				divElement.addEventListener ( 'click', new AgencyClickEL ( agency.agencyPk ) );
				mainDivElement.appendChild ( divElement );
			}
		);
		if ( 1 === result.length ) {
			divElement.click ( );
		}
	}

	/**
	 * Coming soon...
	 * @param {Event} clickEvent the event to handle	 */

	handleEvent ( clickEvent ) {
		document.querySelectorAll ( '.gtfsweb-buttonNetwork' ).forEach (
			element => {
				element.classList.remove ( 'gtfsweb-selected' );
			}
		);
		theUserData.networkId = this.#networkId;
		clickEvent.target.classList.add ( 'gtfsweb-selected' );
		fetch ( 'SelectAgencies.php?networkId=' + this.#networkId )
			.then (
				response => {
					// eslint-disable-next-line no-magic-numbers
					if ( 200 === response.status && response.ok ) {
						response.json ( )
							.then ( result => this.#parseResponse ( result ) )
							.catch ( );
					}
					else {
						console.error ( new Error ( 'Invalid status ' + response.status ) );
					}
				}
			);
	}
}

export default NetworkClickEL;

/* --- End of file --------------------------------------------------------------------------------------------------------- */