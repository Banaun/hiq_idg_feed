import FlagVideo from '../assets/video/hiq_pirate_flag.mp4'

const FlagPage = () => {
    return (
        <div className="video-page">
            <video autoPlay loop muted id="video">
                <source src={FlagVideo} type="video/mp4"/>
            </video>
        </div>
    )
}

export default FlagPage;