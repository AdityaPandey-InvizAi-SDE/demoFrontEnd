var myVariable = Math.floor(Math.random() * 10000000000) + 1;
sessionStorage['myvariable'] = myVariable;
var readValue = sessionStorage['myvariable'];
console.log(readValue);

// However, keep in mind that sessionStorage saves everything as a string, so when working with arrays / objects, you can use JSON to store them:

// var myVariable = {a:test, b:"PAnkaj"};

sessionStorage['myvariable'] = JSON.stringify(myVariable);
var readValue = JSON.parse(sessionStorage['myvariable']);
console.log(sessionStorage['myvariable']);
// // Test cookie
console.log("Let's buils a dynamic chatbot");
// Declare variables here 
const custmsg = document.querySelector(".form-control-msg");
const adduserinput = document.querySelector(".msg-page");

console.log(adduserinput);


custmsg.addEventListener('submit', e => {
    e.preventDefault();
    console.log("clicktest");
    console.log(sessionStorage['myvariable']);
    // console.log(document.getElementById("inputmsgID").value); 
    let userinput = document.getElementById("inputmsgID").value;
    console.log(userinput, typeof userinput);
    if (userinput !== '') {
        adduserinput.innerHTML += `
        <div class="recieved-chats">
        <div class="recieved-chats-img">
            <img src="user1.png">
        </div>
        <div class="recieved-msg">
            <div class = "recieved-msg-inbox">
                <p>${userinput}</p>
                <span class="time">11:01 PM</span>

            </div>
        </div>
        </div>
        `
        adduserinput.scrollTop = adduserinput.scrollHeight;
        custmsg.reset();

        // make post request using fetch api 
        // url = 'https://api.yutybazar.com/api/recievemessage' ;
        url = 'http://127.0.0.1:8000/api/recievemessage';
        let Postdata = {
            question: userinput,
            sessid: sessionStorage['myvariable']
        };
        const data = {};

        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Postdata),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);




            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log("######################################");
        // console.log(rply) ; 
        setTimeout(() => {
            console.log("waiting");
            // console.log(sessionStorage['myvariable'] , "sess strorage") ; 
            const http = new XMLHttpRequest();
            const replyurl = 'http://127.0.0.1:8000/api/recievereply/' + sessionStorage['myvariable'] + '/';
            // const replyurl = 'https://api.yutybazar.com/api/recievereply/'+sessionStorage['myvariable']+'/';
            console.log(replyurl, "replyurl")
            http.open('GET', replyurl);
            http.send();

            http.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(http.responseText);
                    let outgoingreply = http.responseText.replace('"', '').replace('"', '');
                    adduserinput.innerHTML += `
                            <div class="outgoing-chats">
                            <div class="outgoing-chats-msg">
                                <p>${outgoingreply}</p>
                                <span class="time">11:01 PM | October 11</span>
                            </div>
                            <div class="outgoing-chats-img">
                                <img src="SAL_avatar.png">
                            </div>
                                            
                            </div>
                            `;

                    adduserinput.scrollTop = adduserinput.scrollHeight;
                    // create recomendation s 
                    if (outgoingreply.includes("It’s been lovely getting to know you, Yuty will analyse and find products that will work for you")) {
                        console.log('make recommendation');
                        setTimeout(() => {
                            console.log("waiting");
                            const http = new XMLHttpRequest();
                            // const recourl = 'https://api.yuty.com/api/chatrecommendation/'+sessionStorage['myvariable']+'/'; 
                            // console.log(recourl , "recourl") ; 
                            const recourl = 'http://127.0.0.1:8000/api/chatrecommendation/' + sessionStorage['myvariable'] + '/';
                            http.open('GET', recourl);
                            console.log("1111");
                            http.send();
                            console.log('2222', http.readyState, http.status);

                            http.onreadystatechange = function () {
                                console.log("ggdgdgg gdggdgd ggdgdgdg");
                                if (this.readyState === 4 && this.status === 200) {
                                    console.log(typeof JSON.parse(http.responseText));
                                    console.log("show what u read ");
                                    console.log(JSON.parse(http.responseText).recommendations, '|', JSON.parse(http.responseText).requireements);
                                    var reco = JSON.parse(http.responseText).recommendations;
                                    if (reco.length > 0) {
                                        for (i = 0; i < reco.length; i++) {
                                            console.log(reco[i].product_name);
                                            adduserinput.innerHTML += `
                                            <div class="outgoing-chats">
                                                <div class="outgoing-chats-msg">
                                                <p><a target="_blank" href="https://www.yutybazar.com/products/${reco[i].slug}">
<img src="" alt="Product-Image">${reco[i].product_name}</a></p>
                                                </div>
                                                <div class="outgoing-chats-img">
                                                <img src="SAL_avatar.png">
                                            </div>
                                            
                                            </div>
                            `;
                                            console.log("#####################################################################################");
                                            adduserinput.scrollTop = adduserinput.scrollHeight;
                                        }
                                    } else {

                                        adduserinput.innerHTML += `
                                            <div class="outgoing-chats">
                                                <div class="outgoing-chats-msg">
                                                <p>Based on our quick conversation, YUTY's algorithms cannot recommend anything, apologies!</p>
                                                </div>
                                                <div class="outgoing-chats-img">
                                                <img src="SAL_avatar.png">
                                            </div>
                                            
                                            </div>
                            `;
                                        console.log("#####################################################################################");
                                        adduserinput.scrollTop = adduserinput.scrollHeight;
                                    }

                                }

                            };

                        }, 2500);




                    } else {
                        console.log("session not complete ", outgoingreply);
                    }
                }
            }



        }, 2500);






    } else {
        console.log("nouser input is found");
    };


})


var btnTriggerBot = document.getElementById("trigger_chatbot");
var btnCloseBot = document.getElementsByClassName("stop-chatbot")[0];

btnTriggerBot.addEventListener("click", function () {
    btnTriggerBot.style.visibility = "hidden";
    document.getElementsByClassName("container")[0].style.visibility = "visible";
});

btnCloseBot.addEventListener("click", function () {
    btnTriggerBot.style.visibility = "visible";
    document.getElementsByClassName("container")[0].style.visibility = "hidden";
});