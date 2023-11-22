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

import NetworkClickEL from './NetworkClickEL.js';
import SearchInputEL from './SearchInputEL.js';

document.getElementById ( 'gtfsweb-buttonStib' ).addEventListener ( 'click', new NetworkClickEL ( 'gtfs_stib' ) );
document.getElementById ( 'gtfsweb-buttonTec' ).addEventListener ( 'click', new NetworkClickEL ( 'gtfs_tec' ) );
document.getElementById ( 'gtfsweb-buttonDelijn' ).addEventListener ( 'click', new NetworkClickEL ( 'gtfs_delijn' ) );
document.getElementById ( 'gtfsweb-DateInput' ).value = new Date ( )
	.toISOString ( )
	// eslint-disable-next-line no-magic-numbers
	.slice ( 0, 10 );

document.getElementById ( 'gtfsweb-search-input' ).addEventListener ( 'input', new SearchInputEL ( ) );

/* --- End of file --------------------------------------------------------------------------------------------------------- */