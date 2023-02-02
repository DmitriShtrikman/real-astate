export const ContactsMain = () => {
    return (
        <>
        <main className="main contacts-main">
            <div className="contacts-main-map">            
                <iframe title="officeMap" src="https://www.google.com/maps/d/u/0/embed?mid=1-zvIJRWgsO-cbLMJ8JdWzWfuB_9KoDM&ehbc=2E312F" width="640" height="480"></iframe>
            </div>
            <div className="contacts-main-text">
                <div className="contacts-aside-bar-item region-wrp">
                    <h5>Turkiye / Antalya</h5>
                    <p className="contacts-aside-bar-p">2319. Sk., Güzeloba, 07230 Muratpaşa/Antalya</p>
                </div>
                <a className="contacts-button-item" href="tel:+901231234567">
                    <svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.88477 0.511076C2.62689 -0.231039 3.85149 -0.154797 4.49583 0.673634L6.28954 2.97983C6.6187 3.40304 6.73502 3.95409 6.60498 4.47423L6.05772 6.66329C5.99994 6.8944 6.06766 7.13888 6.2361 7.30732L8.69268 9.7639C8.86113 9.93235 9.1056 10.0001 9.33671 9.94229L11.5258 9.39502C12.0459 9.26499 12.597 9.3813 13.0202 9.71047L15.3264 11.5042C16.1548 12.1485 16.231 13.3731 15.4889 14.1152L14.455 15.1492C13.7153 15.8889 12.6089 16.2137 11.5778 15.8512C9.01754 14.9511 6.61438 13.4774 4.56849 11.4315C2.5226 9.38562 1.04895 6.98246 0.148838 4.42225C-0.213682 3.39112 0.11113 2.28472 0.85085 1.545L1.88477 0.511076Z" />
                    </svg>
                    Позвонить нам</a>
                <a className="contacts-button-item" href="https://goo.gl/maps/caRHhD8FZEUx5PsaA" target='_blank'>
                    <svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16C8 16 14 10.3137 14 6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6C2 10.3137 8 16 8 16ZM8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6C11 7.65685 9.65685 9 8 9Z" />
                    </svg>
                    Построить маршрут</a>
            </div>
        </main>            
        </>
    )
}

export default ContactsMain;