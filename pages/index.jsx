import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

let total = 0;
let itemId = 0;

export default function Main() {
    return (
        <div id="main">
            <Navbar />
            <Logo />
            <Sales />
            <Menu />
            <HoursAndLocations />
            <Cart />
            <Reservations />
        </div>
    );
}

function Navbar() {
    function showElement(id) {
        const element = document.getElementById(id);
        element.style.display = "flex";
    }

    function navbar() {
        const navbar = document.getElementById("navbar");
        const navbarButtonShow = document.getElementById("navbarButtonShow");

        if (navbar.style.display == "none") {
            navbar.style.display = "flex";
            navbarButtonShow.style.display = "none";
        }
        
        else {
            navbar.style.display = "none";
            navbarButtonShow.style.display = "flex";
        }
    }

    function scrollTo(section, offset) {
        const viewHeight = window.innerHeight * section + (window.innerHeight * section * offset);

        window.scroll({
            top: viewHeight,
            left: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
            <div id="navbar">
                <span onClick={() => {scrollTo(0, 0)}}>Home</span>
                
                <span onClick={() => {scrollTo(1, .15)}}>Sales</span>

                <span onClick={() => {scrollTo(2, .12)}}>Menu</span>

                <span onClick={() => {showElement("hoursAndLocations")}}>Hours & Locations</span>  

                <span onClick={() => {showElement("cartBox")}}>Cart</span>

                <div id="navbarButtonHide" onClick={navbar}>
                    <div className="arrow"></div>
                </div>

                <div id="reservationButton" onClick={() => {scrollTo(3, .11)}}>Reservations</div>
            </div>

            <div id="navbarButtonShow" onClick={navbar}>
                <div className="arrow showButton"></div>
            </div>
        </>
    );
}

function Logo() {
    function scrollTo(section) {
        const viewHeight = window.innerHeight * section + (window.innerHeight * section * .15);
        window.scroll({
            top: viewHeight,
            left: 0,
            behavior: "smooth"
        });
    }

    return (
        <div id="logoBox">
            <div id="logo">Naga</div>
            <div id="cta" onClick={() => scrollTo(1)}>Check the sales</div>
        </div>
    );
}

function Sales() {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "slide.js";
        script.async = true;

        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        const salesNavLeft = document.getElementById("salesNavLeft");
        const salesNavRight = document.getElementById("salesNavRight");

        salesNavLeft.addEventListener("click", () => {
            onClickAnimate("left");
        });

        salesNavRight.addEventListener("click", () => {
            onClickAnimate("right");
        });
    })

    return (
        <Background content = {
            <div id="sales">
                <div id="salesTitle">Sales!</div>

                <div id="salesContent">
                    <div id="salesDescription">
                        <div id="salesDescriptionTitle0" style={{opacity: 1}}>Cocktail 30% off!</div>
                        <div id="salesDescriptionText0" style={{opacity: 1}}>You can order custom cocktails! Check the menu for more information!</div>
                        <div id="salesDescriptionTitle1" style={{opacity: 0}}>2 Mousse for 75% the price!</div>
                        <div id="salesDescriptionText1" style={{opacity: 0}}>Offer valid til 18/11/2023</div>
                    </div>

                    <div id="salesImage">
                        <div id="item0" style={{opacity: 1, zIndex: 1}}></div>
                        <div id="item1" style={{opacity: 0, zIndex: 0}}></div>
                    </div>
                </div>

                <div id="salesNav">
                    <div id="salesNavLeft">
                        <div className="arrow leftButton"></div>
                    </div>

                    <div id="salesNavItems">
                        <div id="currentItem0"></div>
                        <div id="currentItem1"></div>
                    </div>
                    
                    <div id="salesNavRight">
                        <div className="arrow rightButton"></div>
                    </div>
                </div>
            </div>
        }/>
    );    
}

function Menu() {
    return (
        <Background content = {
            <div id="menuBox">
                <div id="menuTitle">
                    <div>Menu</div>

                    <div id="menuInfo">?</div>

                    <div id="menuInfoDescription">
                        <p>Hover over an item to see its details</p>
                        <p>Add an item to the cart by clicking on its price</p>                            
                    </div>
                </div>

                <div id="menu">
                    <MenuGrid title = "Main Course" content = {
                        <>
                            <MenuGridItem id="beef" name = "Roast Beef with Vegetables" price = "12.99" details = "How would you like your steak?"/>
                        </>
                        
                    }/>

                    <MenuGrid title = "Drinks" content = {
                        <>
                            <MenuGridItem id="cocktail"  name = "Custom Cocktail" price = "4.99" details = "Flavors: ..."/>
                            <MenuGridItem id="beer"  name = "Beer" price = "1.99" details = "Drink with moderation!"/>
                        </>
                    }/>

                    <MenuGrid title = "Desserts" content = {
                        <>
                            <MenuGridItem id="chocolateMousse" name = "Chocolate Mousse" price = "2.99" details = "Placeholder"/>
                        </>
                    }/>
                </div>
            </div>
        }/>
    );
}

function Background(data) {

    useEffect(() => {
        const menuInfo = document.getElementById("menuInfo");
        const description = document.getElementById("menuInfoDescription");

        menuInfo.addEventListener("mouseover", () => {            
            description.style.display = "flex";
        })

        menuInfo.addEventListener("mouseout", () => {            
            description.style.display = "none";
        })
    }, [])    

    return (
        <div id="background">
            <div id="backgroundFilter">
                {data["content"]}
            </div>
        </div>
    );
}

function MenuGrid(data) {
    return (
        <div id="menuGrid">
            <div>{data["title"]}</div>
            {data["content"]}
        </div>
    );
}

function MenuGridItem(data) {
    useEffect(() => {
        const element = document.getElementById(data["id"]);
        const showElement = document.getElementById(data["id"] + "_details");            
        
        element.addEventListener("mouseover", () => {
            showElement.style.display = "flex";
        })

        element.addEventListener("mouseout", () => {
            showElement.style.display = "none";
        })

    },[]);

    function addItem(name, price) {
        const cartItem = document.getElementById("cartItem");
        const cartTitle = document.getElementById("cartTitle");

        const newDiv = document.createElement("div");
        newDiv.id = "menu" + itemId;

        const info = document.createElement("div");
        const infoText = document.createTextNode(name + " " + "$" + price);
        info.appendChild(infoText);

        const button = document.createElement("div")
        const buttonText = document.createTextNode("-");
        let tmpNumber = itemId
        button.id = "minus" + itemId;
        button.className = "minus";
        button.appendChild(buttonText);

        newDiv.appendChild(info);
        newDiv.appendChild(button);

        cartItem.appendChild(newDiv);

        total = total + Number(price);
        const totalString = total.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        cartTitle.textContent = `Cart - Total: $${totalString}`;

        const minusButton = document.getElementById("minus" + tmpNumber);
        minusButton.addEventListener("click", () => {
            const removeElement = document.getElementById("menu" + tmpNumber);
            removeElement.remove();     
            total = total - Number(price);
            const totalString = total.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            cartTitle.textContent = `Cart - Total: $${totalString}`;      
        });

        itemId++;
    }

    return (
        <div id="menuGridItem">
            <div id={data["id"]} className="menuItem">{data["name"]}</div>
            <div className="menuPrice" onClick={() => addItem(data["name"], data["price"])}>${data["price"]}</div>
            <div className="details" id={data["id"] + "_details"}>{data["details"]}</div>
        </div>
    );
}

function HoursAndLocations() {
    function hide() {
        const element = document.getElementById("hoursAndLocations");
        element.style.display = "none";
    }

    return (        
        <div id="hoursAndLocations">
            <div id="hoursAndLocationsButton" onClick={hide}>&#9587;</div>

            <div id="hoursAndLocationsTitle">Hours & Locations</div>

            <div id="hoursAndLocationsGrid">
                <div>Moonday - Friday | 6:00PM - 12:00PM | Any Place </div>
                <div>Saturday - Sunday | 6:00PM - 10:00PM | Any Place </div>
            </div>
        </div>
    );
}

function Cart() {
    function hide() {
        const element = document.getElementById("cartBox");
        element.style.display = "none";
    }

    return (
        <div id="cartBox">
            <div id="cart">
                <div id="cartItemBox">
                    <div id="cartTitle">
                        <div>Cart - Total: $0.00</div>
                    </div>

                    <div id="cartItem">
                    </div>
                </div>
                

                <form id="cartForm">
                    <div id="cartInfo">
                        <input type="text" placeholder="Street - Unit Number - Zip Code"></input>   
                    </div>

                    <div id="cartInfo">
                        <input type="text" placeholder="Code"></input>
                    </div>

                    <div id="cartInfo">
                        <input placeholder="Additional Details"></input>
                    </div>

                    <div id="cartButton">
                        <input type="submit" value={"Submit"}></input>
                    </div>

                    <div id="cartClose" onClick={hide}>&#9587;</div>
                </form>
            </div>
        </div>
    );
}

function Reservations() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednessday" , "Thursday", "Friday", "Saturday" ]
    const month = ["-", "-" , "-"];

    for (let i = 1; i < 31; i++) {
        month.push(i);
    }

    function select(element) {
        const allDays = document.querySelectorAll(".allDays");
        const day = element.target;

        allDays.forEach((e) => {
            e.style.backgroundColor = "";
        });

        day.style.backgroundColor = "#090";
    }

    useEffect(() => {
        const reservationHourButton = document.getElementById("reservationHourButton");
        const reservationHourOption = document.getElementById("reservationHourOption");
        const reservationButtonDetail = document.getElementById("reservationHourButtonDetail");

        reservationHourButton.addEventListener("click", () => {
            if (reservationHourOption.style.display == "grid") {
                reservationHourOption.style.display = "none"
                reservationButtonDetail.style.transform = "rotate(0deg)";
            }

            else {
                reservationHourOption.style.display = "grid";
                reservationButtonDetail.style.transform = "rotate(180deg)";
            }
        });

    }, []);

    function selectHour(element) {
        const reservationHourButton = document.getElementById("reservationHourButton");
        const hour = element.target.textContent;
        const reservationHourOption = document.getElementById("reservationHourOption");
        const reservationButtonDetail = document.getElementById("reservationHourButtonDetail");

        reservationHourButton.textContent = hour;

        if (reservationHourOption.style.display == "grid") {
            reservationHourOption.style.display = "none"
            reservationButtonDetail.style.transform = "rotate(0deg)";
        }

        else {
            reservationHourOption.style.display = "grid";
            reservationButtonDetail.style.transform = "rotate(180deg)";
        }
    }

    return (
            <Background content = {
                <div id="reservation">
                    <div id="reservationCalendarBox">
                        <div id="reservationCalendarTitle">November</div>

                        <div id="reservationCalendar">
                            {days.map((day) => <div key={uuidv4()}>{day}</div>)}
                            {month.map((day) => <div key={uuidv4()} onClick={(e) => select(e)} className="allDays">{day}</div>)}
                        </div>
                        
                        <div id="reservationHour">
                            <div id="reservationHourButton">Choose a Hour</div>
                            <div id="reservationHourButtonDetail"></div>

                            <div id="reservationHourOption">
                                <span onClick={(e) => selectHour(e)}>6:30PM</span>
                                <span onClick={(e) => selectHour(e)}>7:30PM</span>
                                <span onClick={(e) => selectHour(e)}>8:00PM</span>
                                <span onClick={(e) => selectHour(e)}>8:30PM</span>
                                <span onClick={(e) => selectHour(e)}>9:00PM</span>
                                <span onClick={(e) => selectHour(e)}>9:30PM</span>
                            </div>
                        </div>
                    </div>

                    <form id="reservationForm">
                        <input type="text" placeholder="Full Name"></input>
                        <input type="text" placeholder="Phone Number"></input>
                        <input type="text" placeholder="E-mail"></input>
                        <textarea placeholder="Occasion, Requests..."></textarea>
                        <input type="submit" value={"Submit"}></input>
                    </form>  

                    <div id="reservationTitle">Reservation</div>            
                </div>
            }/>       
    );
}