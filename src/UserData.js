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

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
 * Coming soon...
 */
/* ------------------------------------------------------------------------------------------------------------------------- */

class UserData {

	/**
	 * Coming soon...
	 * @type {string}
	 */

	#networkId;

	/**
	 * Coming soon...
	 * @type {string}
	 */

	#agencyPk;

	/**
	 * Coming soon...
	 * @type {string}
	 */

	#routePk;

	/**
	 * Coming soon...
	 * @type {string}
	 */

	#routeFullName;

	/**
	 * Coming soon...
	 */

	#cleanAgency ( ) {
		let mainDivElement = document.getElementById ( 'gtfsweb-agencies' );
		while ( mainDivElement.firstChild ) {
			mainDivElement.removeChild ( mainDivElement.firstChild );
		}
	}

	/**
	 * Coming soon...
	 */

	#cleanRoute ( ) {
		let mainDivElement = document.getElementById ( 'gtfsweb-routes' );
		while ( mainDivElement.firstChild ) {
			mainDivElement.removeChild ( mainDivElement.firstChild );
		}
	}

	/**
	 * Coming soon...
	 */

	#cleanTrip ( ) {
		let mainDivElement = document.getElementById ( 'gtfsweb-trip' );
		while ( mainDivElement.firstChild ) {
			mainDivElement.removeChild ( mainDivElement.firstChild );
		}
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get networkId ( ) { return this.#networkId; }

	set networkId ( networkId ) {
		this.#cleanAgency ( );
		this.#cleanRoute ( );
		this.#cleanTrip ( );
		this.#networkId = networkId;
		this.#agencyPk = '';
		this.#routePk = '';
		this.#routeFullName = '';
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get agencyPk ( ) { return this.#agencyPk; }

	set agencyPk ( agencyPk ) {
		this.#cleanRoute ( );
		this.#cleanTrip ( );
		this.#agencyPk = agencyPk;
		this.#routePk = '';
		this.#routeFullName = '';
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get routePk ( ) { return this.#routePk; }

	set routePk ( routePk ) {
		this.#cleanTrip ( );
		this.#routePk = routePk;
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get routeFullName ( ) { return this.#routeFullName; }

	set routeFullName ( routeFullName ) {
		this.#routeFullName = routeFullName;
		this.#cleanTrip ( );
	}

	/**
	 * The constructor
	 */

	constructor ( ) {
		Object.freeze ( this );
		this.#networkId = '';
		this.#agencyPk = '';
		this.#routePk = '';
		this.#routeFullName = '';
	}
}

/**
 * Coming soon...
 */

const theUserData = new UserData ( );

export default theUserData;

/* --- End of file --------------------------------------------------------------------------------------------------------- */