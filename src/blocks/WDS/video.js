/**
 * Set video output.
 * @param {object} props - The block object.
 * @return {string} The video output container.
 */
function BackgroundOptionsVideoOutput(props) {
	if ('video' === props.attributes.backgroundType && props.attributes.backgroundVideo) {
		return (
			<video
				className="video-container video-container-overlay"
				autoPlay="true"
				loop="true"
				muted="true"
			>
				<source
					type="video/mp4"
					src={props.attributes.backgroundVideo.url}
				/>
			</video>
		);
	}
}

export default BackgroundOptionsVideoOutput;