import React from "react";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import imgTeam from "./img/team.jpg"
import partners from "./img/partners.jpeg"
import statistics from "./img/statistics.jpg"
import Cards from "../../../components/cards/cards";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Main = () => {
    const navigate = useNavigate();
    const name = ['rent', 'sale', 'new'];

    const handleSearch = (e) => {        
        e.preventDefault();
        console.log('Search');
    };

    const handleMap = (e) => {        
        e.preventDefault();
        navigate("/map")
        console.log('Map');
    };

    useEffect(() => {
        document.querySelector('.carousel-inner').children[0].classList.add('active');
    });

    return (
    <>
        <Header />
        <main>
            <div className="index-page-search-and-title  container-primary">
                <div style={{backgroundImage: `url("img/index_background_search_block.jpg")`}} className="index-page-search-block">
                <h2 className="index-page-search-block-header-txt-high">First in Antalya </h2>
                <h3 className="index-page-search-block-header-txt-low">Real Estate Professionals</h3>
                <div className="main-search-block">
                    <form className="row g-3 main-search-form" id="mainSearch">
                        <div className="col-md-6">
                            <label htmlFor="inputState"  className="form-label">Предложение</label>
                            <select className="form-select" id="inputState" required>
                                <option value="rent">Аренда</option>
                                <option value="sale">Продажа</option>
                                <option value="new">Новостройки</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid option.
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputCountry" className="form-label">Страна</label>
                            <select className="form-select" id="inputCountry" required>
                            <option value="rus">Россия</option>
                            <option value="trk">Турция</option>
                            </select>
                            <div className="invalid-feedback">
                            Please select a valid option.
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputCity" className="form-label">Город</label>
                            <select className="form-select" id="inputCity" required>
                                <option value="antalya">...</option>
                                <option value="antalya">Анталья</option>
                                <option value="alanya">Аланья</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid option.
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputRegion" className="form-label">Район</label>
                            <select className="form-select" id="inputRegion" required>
                                <option value="antalya">...</option>
                                <option value="konyalti">Конялты</option>
                                <option value="kepez">Кепез</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid option.
                            </div>
                        </div>            
                        <div className="search-btn-group">
                            <button onClick={handleSearch} className="btn btn-primary button-blue" type="submit">
                                <svg width="25" height="25" viewBox="0 0 56 56"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M43.5797 45.7492L30.2447 32.4118C24.3126 36.6292 16.1384 35.5977 11.4401 30.0387C6.74176 24.4797 7.08674 16.2479 12.2337 11.1015C17.3793 5.95289 25.6119 5.60642 31.1719 10.3045C36.732 15.0026 37.7641 23.1776 33.5464 29.1102L46.8814 42.4475L43.582 45.7468L43.5797 45.7492ZM22.1317 11.6661C17.707 11.6652 13.8896 14.7711 12.9908 19.1035C12.092 23.436 14.3587 27.8041 18.4186 29.5634C22.4785 31.3227 27.2158 29.9895 29.7623 26.371C32.3087 22.7525 31.9645 17.8433 28.938 14.6155L30.3497 16.0155L28.7584 14.4289L28.7304 14.4008C26.9845 12.6443 24.6083 11.6595 22.1317 11.6661Z" />
                                    </svg>
                                Поиск</button>
                            <button onClick={handleMap} className="btn btn-danger button-red" type="submit" form="mainSearch">
                                <svg width="25" height="25" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_0_2594)">
                                    <path d="M24 4C16.27 4 10 10.27 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.27 31.73 4 24 4ZM24 23C21.24 23 19 20.76 19 18C19 15.24 21.24 13 24 13C26.76 13 29 15.24 29 18C29 20.76 26.76 23 24 23Z" />
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_0_2594">
                                        <rect width="48" height="48" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                Карта
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>            
            <div className="index-page-offers-carousel container-primary">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">                        
                        {name.map((item) => {
                            return (
                                <div key={Math.random() * 100} className="carousel-item">
                                    <Cards name={item}/>
                                </div>  
                            )
                        })}
                    </div>
                    <button className="carousel-control-prev carousel-control-custom-main" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next carousel-control-custom-main" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>                
            </div>
            <div className="index-page-statistic-carousel container-primary">
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={imgTeam} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                        <img src={partners} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                        <img src={statistics} className="d-block w-100" alt="..." />
                        </div>
                    </div>                    
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
            </div>
            <div className="index-page-aboutus container-primary">
                <div className="index-page-aboutus-story">
                <h2><span>Н</span>аша история</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, ipsum non officiis cum vero repellendus iusto, culpa esse, officia ex eligendi nulla dicta veritatis. Tenetur in doloremque dolorum cumque iure?
                Voluptates ipsa provident itaque sequi deleniti alias assumenda maiores dolorum cupiditate, nesciunt repudiandae, repellat debitis ducimus fugiat eveniet, aut fugit laboriosam ab! Quaerat blanditiis repudiandae non expedita mollitia accusantium inventore.
                Ipsam, fuga commodi labore eum culpa consequuntur explicabo tenetur eos quos aliquam nesciunt! Nostrum enim, rem eligendi consequatur necessitatibus laudantium accusamus perferendis nemo, ipsa porro, autem doloribus pariatur corporis reiciendis!
                Repellat amet nam, eligendi quidem ipsa tenetur dignissimos impedit pariatur aliquam iure voluptatum. Reiciendis placeat omnis quaerat velit quidem unde beatae ratione eaque officia perferendis atque vel, molestias, corrupti voluptate.
                Vero commodi porro veritatis atque facilis dignissimos. Dolore architecto voluptates, veritatis, consequatur quis illo, odio reprehenderit reiciendis commodi quas quos veniam quam deleniti non vel eos consectetur similique! Quibusdam, et.
                Porro deserunt praesentium fugit vitae modi iusto, amet dolorem. Velit molestiae voluptas at repellendus, eum, in modi cum soluta nam eius error expedita nulla odit est voluptate dignissimos id mollitia.</p>
                </div>
            </div>
        </main>
        <Footer  />
    </>
    )
}

export default Main;