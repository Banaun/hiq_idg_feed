const FlagPage = (props) => {
    return (
        <div className="video-page">
            <video autoPlay loop muted id="video">
                <source src={props.flagVideo} type="video/mp4"/>
            </video>
        </div>
    )
}

export default FlagPage;