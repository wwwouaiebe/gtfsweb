class WaitAnimation {

	#waitAnimation;

	constructor ( ) {
		Object.freeze ( this );
		this.#waitAnimation = document.getElementById ( 'gtfsweb-waitUI' );

	}

	show ( ) { this.#waitAnimation.classList.remove ( 'gtfsweb-hidden' ); }

	hide ( ) { this.#waitAnimation.classList.add ( 'gtfsweb-hidden' ); }
}

const theWaitAnimation = new WaitAnimation;

export default theWaitAnimation;