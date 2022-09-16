import FlagVideo from '../assets/video/test.mp4'

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