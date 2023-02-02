import Sorter from "../sorter/sorter";

export const MapComponent = () => {
    return (
        <>
            <main className="main">
                <Sorter/>
                <div className="map-wrp">                    
                    <iframe title="gMap" className="map" src="https://www.google.com/maps/d/embed?mid=12Jrp9q_mJaWmBcOfMF6FbbwpVbzf7n0&ehbc=2E312F" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </main>
        </>
    )
}

export default MapComponent;
