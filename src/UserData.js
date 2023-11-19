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

	#network;

	/**
	 * Coming soon...
	 * @type {string}
	 */

	#agencyId;

	/**
	 * Coming soon...
	 * @type {string}
	 */

	#routeId;

	/**
	 * Coming soon...
	 * @type {string}
	 */

	#routeFullName;

	/**
	 * Coming soon...
	 */

	#cleanAgency ( ) {
		let mainDivElement = document.getElementById ( 'gtfs-agency' );
		while ( mainDivElement.firstChild ) {
			mainDivElement.removeChild ( mainDivElement.firstChild );
		}
	}

	/**
	 * Coming soon...
	 */

	#cleanRoute ( ) {
		let mainDivElement = document.getElementById ( 'gtfs-route' );
		while ( mainDivElement.firstChild ) {
			mainDivElement.removeChild ( mainDivElement.firstChild );
		}
	}

	/**
	 * Coming soon...
	 */

	#cleanTrip ( ) {
		let mainDivElement = document.getElementById ( 'gtfs-trip' );
		while ( mainDivElement.firstChild ) {
			mainDivElement.removeChild ( mainDivElement.firstChild );
		}
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get network ( ) { return this.#network; }

	set network ( network ) {
		this.#cleanAgency ( );
		this.#cleanRoute ( );
		this.#cleanTrip ( );
		this.#network = network;
		this.#agencyId = '';
		this.#routeId = '';
		this.#routeFullName = '';
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get agencyId ( ) { return this.#agencyId; }

	set agencyId ( agencyId ) {
		this.#cleanRoute ( );
		this.#cleanTrip ( );
		this.#agencyId = agencyId;
		this.#routeId = '';
		this.#routeFullName = '';
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get routeId ( ) { return this.#routeId; }

	set routeId ( routeId ) {
		this.#cleanTrip ( );
		this.#routeId = routeId;
	}

	/**
	 * Coming soon...
	 * @type {String}
	 */

	get routeFullName ( ) { return this.#routeFullName; }

	set routeFullName ( routeFullName ) { this.#routeFullName = routeFullName; }

	/**
	 * The constructor
	 */

	constructor ( ) {
		Object.freeze ( this );
		this.#network = '';
		this.#agencyId = '';
		this.#routeId = '';
		this.#routeFullName = '';
	}
}

/**
 * Coming soon...
 */

const theUserData = new UserData ( );

export default theUserData;

/* --- End of file --------------------------------------------------------------------------------------------------------- */