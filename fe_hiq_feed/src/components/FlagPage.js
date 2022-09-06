import flagVideo from '../assets/video/pirate-flag.mp4'

const FlagPage = () => {
    return (
        <div className="video-page">
            <video autoPlay loop muted id="video">
                <source src={flagVideo} type="video/mp4"/>
            </video>
        </div>
    )
}

export default FlagPage;