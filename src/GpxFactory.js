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

import theUserData from './UserData.js';

/* ------------------------------------------------------------------------------------------------------------------------- */
/**
 * Coming soon...
 */
/* ------------------------------------------------------------------------------------------------------------------------- */

class GpxFactory {

	/**
	 * Coming soon...
	 * @type {String}
	 */

	#shapeId;

	/**
	 * Coming soon...
	 * @type {Object}
	 */

	#result;

	/**
	 * Coming soon...
	 * @type {String}
	 */

	#gpxString;

	/**
	The time stamp added in the gpx
	@type {String}
	*/

	#timeStamp;

	/**
	Simple constant for gpx presentation
	@type {String}
	*/

	static get #TAB0 ( ) { return '\n'; }

	/**
	Simple constant for gpx presentation
	@type {String}
	*/

	static get #TAB1 ( ) { return '\n\t'; }

	/**
	Simple constant for gpx presentation
	@type {String}
	*/

	static get #TAB2 ( ) { return '\n\t\t'; }

	/**
	Simple constant for gpx presentation
	@type {String}
	*/

	static get #TAB3 ( ) { return '\n\t\t\t'; }

	/**
	Simple constant for gpx presentation
	@type {String}
	*/

	static get #TAB4 ( ) { return '\n\t\t\t\t'; }

	/**
	Creates the header of the gpx file
	*/

	#addHeader ( ) {

		// header
		this.#gpxString = '<?xml version="1.0"?>' + GpxFactory.#TAB0;
		this.#gpxString += '<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
		'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
		'xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" ' +
		'version="1.1" creator="TravelNotes">';
	}

	/**
	Replace the chars &, ', ", < and > with entities
	@param {String} text The text containing reserved chars
	@return {String} The text with reserved chars replaced by entities
	*/

	#replaceEntities ( text ) {
		return ( text.replaceAll ( '&', '&amp;' )
			.replaceAll ( /\u0027/g, '&apos;' )
			.replaceAll ( /"/g, '&quot;' )
			.replaceAll ( /</g, '&lt;' )
			.replaceAll ( />/g, '&gt;' )
		);
	}

	/**
	Add the waypoints to the gpx file
	*/

	#addWayPoints ( ) {
		this.#result.stops.forEach (
			currentStop => {
				this.#gpxString +=
					GpxFactory.#TAB1 + '<wpt lat="' +
					currentStop.lat +
					'" lon="' +
					currentStop.lon + '">' +
					GpxFactory.#TAB2 + this.#timeStamp +
					GpxFactory.#TAB2 + '<name>' +
					currentStop.sequence + ' - ' +
					this.#replaceEntities ( currentStop.name ) +
					' ( ' + this.#replaceEntities ( currentStop.id ) + ' ) ' +
					'</name>' +
					GpxFactory.#TAB1 + '</wpt>';
			}
		);
	}

	/**
	Add the track to the gpx file
	*/

	#addTrack ( ) {
		this.#gpxString += GpxFactory.#TAB1 + '<trk>';

		this.#gpxString += GpxFactory.#TAB2 + '<name>' +
			this.#replaceEntities ( theUserData.routeFullName + ' - ' + this.#shapeId ) +
			'</name>';
		this.#gpxString += GpxFactory.#TAB2 + '<trkseg>';

		this.#result.shapePoints.forEach (
			shapePoint => {
				this.#gpxString +=
                    GpxFactory.#TAB3 +
                    '<trkpt lat="' + shapePoint.lat + '" lon="' + shapePoint.lon + '">' +
                    GpxFactory.#TAB4 + this.#timeStamp +
                    GpxFactory.#TAB3 + '</trkpt>';
			}
		);

		this.#gpxString += GpxFactory.#TAB2 + '</trkseg>';
		this.#gpxString += GpxFactory.#TAB1 + '</trk>';
	}

	/**
	Add the footer to the gpx file
	*/

	#addFooter ( ) {
		this.#gpxString += GpxFactory.#TAB0 + '</gpx>';
	}

	/**
	Save a string to a file
	@param {String} fileName The file name
	@param {String} fileContent The file content
	@param {?string} fileMimeType The mime type of the file. Default to 'text/plain'
	*/

	#saveFile ( fileName, fileContent, fileMimeType ) {
		try {
			const objURL =
				fileMimeType
					?
					window.URL.createObjectURL ( new File ( [ fileContent ], fileName, { type : fileMimeType } ) )
					:
					URL.createObjectURL ( fileContent );
			const element = document.createElement ( 'a' );
			element.setAttribute ( 'href', objURL );
			element.setAttribute ( 'download', fileName );
			element.click ( );
			window.URL.revokeObjectURL ( objURL );
		}
		catch ( err ) {
			if ( err instanceof Error ) {
				console.error ( err );
			}
		}
	}

	/**
	Save the gpx string to a file
	*/

	#saveGpxToFile ( ) {
		let fileName = theUserData.routeFullName + ' - from ' +
			this.#result.stops [ 0 ].name + ' to ' +
			this.#result.stops [ this.#result.stops.length - 1 ].name +
			' - ' + this.#shapeId + '.gpx';
		this.#saveFile ( fileName, this.#gpxString, 'application/xml' );
	}

	/**
	 * Coming soon...
	 */

	#buildGpx ( ) {
		this.#timeStamp = '<time>' + new Date ( ).toISOString ( ) + '</time>';
		this.#addHeader ( );

		this.#addWayPoints ( );

		// this.#addRoute ( );
		this.#addTrack ( );
		this.#addFooter ( );
		this.#saveGpxToFile ( );

	}

	/**
	 * The constructor
	 * @param {String} shapeId Coming soon
	 * @param {Object} result Coming soon
	 */

	constructor ( shapeId, result ) {
		this.#shapeId = shapeId;
		this.#result = result;
		Object.freeze ( this );
		this.#buildGpx ( );
	}
}

export default GpxFactory;

/* --- End of file --------------------------------------------------------------------------------------------------------- */