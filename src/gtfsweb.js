class GpxFactory {

    #shapeId;
    #result;
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

    /*
	#addWayPoints ( ) {
		const wayPointsIterator = this.#route.wayPoints.iterator;
		while ( ! wayPointsIterator.done ) {
			this.#gpxString +=
				GpxFactory.#TAB1 + '<wpt lat="' + wayPointsIterator.value.lat + '" lon="' + wayPointsIterator.value.lng + '">' +
				GpxFactory.#TAB2 + this.#timeStamp +
				GpxFactory.#TAB2 + '<name>' + this.#replaceEntities ( wayPointsIterator.value.fullName ) + '</name>' +
				GpxFactory.#TAB1 + '</wpt>';

		}
	}
    */

	/**
	Add the route to the gpx file
	*/

    /*
	#addRoute ( ) {
		this.#gpxString += GpxFactory.#TAB1 + '<rte>';
		this.#gpxString += GpxFactory.#TAB2 + '<name>' + this.#replaceEntities ( this.#route.computedName ) + '</name>';
		const maneuverIterator = this.#route.itinerary.maneuvers.iterator;
		while ( ! maneuverIterator.done ) {
			const wayPoint = this.#route.itinerary.itineraryPoints.getAt (
				maneuverIterator.value.itineraryPointObjId
			);
			this.#gpxString +=
				GpxFactory.#TAB2 + '<rtept lat="' + wayPoint.lat + '" lon="' + wayPoint.lng + '">' +
				GpxFactory.#TAB3 + this.#timeStamp +
				GpxFactory.#TAB3 + '<desc>' + this.#replaceEntities ( maneuverIterator.value.instruction ) + '</desc>' +
				GpxFactory.#TAB2 + '</rtept>';
		}
		this.#gpxString += GpxFactory.#TAB1 + '</rte>';
	}
    */

	/**
	Add the track to the gpx file
	*/

	#addTrack ( ) {
		this.#gpxString += GpxFactory.#TAB1 + '<trk>';
		// this.#gpxString += GpxFactory.#TAB2 + '<name>' + this.#replaceEntities ( this.#route.computedName ) + '</name>';
		this.#gpxString += GpxFactory.#TAB2 + '<trkseg>';


        this.#result.forEach (
            shapePoint => {
                this.#gpxString +=
                    GpxFactory.#TAB3 +
                    '<trkpt lat="' + shapePoint.shape_pt_lat + '" lon="' + shapePoint.shape_pt_lon + '">' +
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
		let fileName = this.#shapeId + '.gpx';
		this.#saveFile ( fileName, this.#gpxString, 'application/xml' );
	}

    #buildGpx ( ) {
		this.#timeStamp = '<time>' + new Date ( ).toISOString ( ) + '</time>';
		this.#addHeader ( );
		// this.#addWayPoints ( );
		// this.#addRoute ( );
		this.#addTrack ( );
		this.#addFooter ( );
		this.#saveGpxToFile ( );

    }

    constructor ( shapeId, result ) {
        this.#shapeId = shapeId;
        this.#result = result;
        Object.freeze ( this );
        this.#buildGpx ( );
    }
}

class ShapeClickEL {

    #network;
    #shapeId;

    constructor ( network, shapeId ) {
        this.#network = network;
        this.#shapeId = shapeId;
        Object.freeze ( this );
    }

    #parseResponse (result ) {
        console.log (result );
        new GpxFactory ( this.#shapeId, result );
    }

    handleEvent ( ) {
        document.querySelectorAll ( '.gtfsweb-buttonShape' ).forEach (
            element => {
                element.classList.remove ( 'gtfsweb-selected' );
            }
        );
        document.getElementById ( 'gtfsweb-button-shape' + this.#shapeId ).classList.add ( 'gtfsweb-selected');
        fetch ( 'shape.php?network=' + this.#network + '&shapeId=' + this.#shapeId)
        .then (
            response => {
                if ( 200 === response.status && response.ok ) {
                    response.json ( )
                        .then ( result => this.#parseResponse ( result ) );
                }
                else {
                    onError ( new Error ( 'Invalid status ' + response.status ) );
                }
            }
        );
 }
}

/**
 * The user have clicked on a route. We add the trips
 */

class RouteClickEL {

    #network;
    #routeId;

    constructor ( network, routeId ) {
        this.#network = network;
        this.#routeId = routeId;
        Object.freeze ( this );
    }

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
                divElement.addEventListener ( 'click', new ShapeClickEL( this.#network, trip.shape_id  ) );
                 mainDivElement.appendChild ( divElement );
                }
        )
    }

    handleEvent ( ) {
        document.querySelectorAll ( '.gtfsweb-buttonRoute' ).forEach (
            element => {
                element.classList.remove ( 'gtfsweb-selected' );
            }
        );
        document.getElementById ( 'gtfsweb-button-route' + this.#routeId ).classList.add ( 'gtfsweb-selected');
        fetch ( 'trip.php?network=' + this.#network + '&route=' + this.#routeId)
            .then (
				response => {
					if ( 200 === response.status && response.ok ) {
						response.json ( )
							.then ( result => this.#parseResponse ( result ) );
					}
					else {
						onError ( new Error ( 'Invalid status ' + response.status ) );
					}
				}
			);
    }
}

/**
 * The user have clicked on a agency. We add the routes
 */

class AgencyClickEL {

    #network;
    #agencyId;
    constructor ( network, agencyId ) {
        this.#network = network;
        this.#agencyId = agencyId;
        Object.freeze ( this );
    }

    #parseResponse ( result ) {
         let mainDivElement = document.getElementById ( 'gtfs-route' );
        while ( mainDivElement.firstChild ) {
            mainDivElement.removeChild ( mainDivElement.firstChild );
        }
        result.forEach (
            route => {
                let divElement = document.createElement ( 'div' );
                divElement.innerText = route.route_short_name + ' - '+ route.route_long_name;
                divElement.classList.add ( 'gtfsweb-button' );
                divElement.classList.add ( 'gtfsweb-buttonRoute' );
                divElement.id = 'gtfsweb-button-route' + route.route_id; 
                divElement.addEventListener ( 'click', new RouteClickEL( this.#network, route.route_id  ) );
                 mainDivElement.appendChild ( divElement );
                }
        )
    }
    
   handleEvent ( ) {
        document.querySelectorAll ( '.gtfsweb-buttonAgency' ).forEach (
            element => {
                element.classList.remove ( 'gtfsweb-selected' );
            }
        );
        document.getElementById ( 'gtfsweb-button-agency' + this.#agencyId ).classList.add ( 'gtfsweb-selected');
        fetch ( 'route.php?network=' + this.#network + '&agency=' + this.#agencyId)
            .then (
				response => {
					if ( 200 === response.status && response.ok ) {
						response.json ( )
							.then ( result => this.#parseResponse ( result ) );
					}
					else {
						onError ( new Error ( 'Invalid status ' + response.status ) );
					}
				}
			)
    }
}

/**
 * The user have clicked on a network. We add the agencies
 */

class NetworkClickEL {

    #network;

    constructor ( network ) {
        this.#network = network;
        Object.freeze ( this )
    }

    #parseResponse ( result ) {
        let mainDivElement = document.getElementById ( 'gtfs-route' );
        while ( mainDivElement.firstChild ) {
            mainDivElement.removeChild ( mainDivElement.firstChild );
        }
        mainDivElement = document.getElementById ( 'gtfs-agency' );
        while ( mainDivElement.firstChild ) {
            mainDivElement.removeChild ( mainDivElement.firstChild );
        }
        result.forEach (
            agency => {
                let divElement = document.createElement ( 'div' );
                divElement.innerText = agency.agency_name;
                divElement.classList.add ( 'gtfsweb-button' );
                divElement.classList.add ( 'gtfsweb-buttonAgency' );
                divElement.id = 'gtfsweb-button-agency' + agency.agency_id; 
                divElement.addEventListener ( 'click', new AgencyClickEL( this.#network, agency.agency_id  ) );
                 mainDivElement.appendChild ( divElement );
            }
        )
    }

    handleEvent ( ){
        document.querySelectorAll ( '.gtfsweb-buttonNetwork' ).forEach (
            element => {
                element.classList.remove ( 'gtfsweb-selected' );
            }
        );
        document.getElementById ( 'gtfsweb-button' + this.#network ).classList.add ( 'gtfsweb-selected');
        fetch ( 'agency.php?network=' + this.#network )
            .then (
				response => {
					if ( 200 === response.status && response.ok ) {
						response.json ( )
							.then ( result => this.#parseResponse ( result ) );
					}
					else {
						onError ( new Error ( 'Invalid status ' + response.status ) );
					}
				}
			)
    }
}

document.getElementById ( 'gtfsweb-buttonStib').addEventListener ( 'click', new NetworkClickEL ( 'Stib') );
document.getElementById ( 'gtfsweb-buttonTec' ).addEventListener ( 'click', new NetworkClickEL ( 'Tec') );