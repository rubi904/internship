const subjectBox = document.getElementById("subjectBox");
const questionBox = document.getElementById("questionBox");
const submitBtn = document.getElementById("submitButton");
const welcomeView = document.getElementById("Welcome-view");
const questionFormBtn = document.getElementById("QuestionFormBtn");
const questionContainer = document.getElementById("question-container");

const questionHeadingResponseForm = document.getElementById("questionHeading");
const questionResponseForm = document.getElementById("question");

const responseFormView = document.getElementById("response-form-view");


const responseContainer = document.getElementById("responseContainer");
const responseName = document.getElementById("responseName");
const responseComment = document.getElementById("responseComment");
const responseSubmitButton = document.getElementById("responseSubmitButton");

const resolveButton = document.getElementById("resolveButton");

const Responses = document.getElementById("responses");

questionFormBtn.addEventListener('click',()=>
{
    welcomeView.classList.remove("hidden");
    responseFormView.classList.add("hidden");
});

submitBtn.addEventListener('click',function(event)
{
    if(subjectBox.value !== "" && questionBox.value !== "")
    {
        questionContainer.classList.add("questionContainer");

        //Question ko store krne ke liye ek new div tag 
        const questionElement = document.createElement("div");
        questionElement.className = "questions";

        const questionHeading = document.createElement("h2");
        questionHeading.classList.add("questionHeading");
        questionHeading.textContent = subjectBox.value;

        const question = document.createElement("p");

        question.classList.add("question");
        question.textContent = questionBox.value;
        
        const hr =  document.createElement("hr");
        
        //Question heading and question ko jo question store krne ke liye div tag bnaaya tha, usme append 
        questionElement.appendChild(questionHeading);
        questionElement.appendChild(question);

        //jo hmaara html code question container  hai usme question ko append krna
        questionElement.appendChild(hr);
        questionContainer.appendChild(questionElement);
        //questionContainer.appendChild(hr);

        subjectBox.value = "";
        questionBox.value = "";
        alert("Response Submitted");
        event.preventDefault();

        const searchBar = document.getElementById("SearchQuestionBar");

        searchBar.addEventListener('input',function()
        {
            let searchTerm = searchBar.value.toLocaleLowerCase();
            const questionElements = document.querySelectorAll(".questions");

            questionElements.forEach((Element) => {

                const questionTitle = Element.querySelector(".questionHeading").innerText.toLowerCase();
              
                const questionText = Element.querySelector(".question").innerText.toLowerCase();

                if (questionTitle.includes(searchTerm) || questionText.includes(searchTerm)) 
                {
                    Element.style.display = "block";
                } 
                else 
                {
                    Element.style.display = "none";
                }
            });
        }); 

        questionElement.addEventListener('click', function() 
        {        
            showResponseForm(questionHeading,question);
        });

    }
});

function showResponseForm(questionHeading,question)
{
    welcomeView.classList.add("hidden");
    responseFormView.classList.remove("hidden");

    var oldData = null;
    let value = questionHeading.textContent + question.textContent;
    oldData = localStorage.getItem(value);
    
    if(oldData !== null)
    {
        responseContainer.innerHTML = oldData;
    }
    else
    {
        responseContainer.innerHTML = "";
    }
    questionHeadingResponseForm.textContent = questionHeading.textContent;
    questionResponseForm.textContent = question.textContent;
}

resolveButton.addEventListener('click',()=>
{
    const questionElements = document.querySelectorAll(".questions");
    questionElements.forEach((Element) => {
        var value = questionHeadingResponseForm.textContent + questionResponseForm.textContent;
        if(Element.textContent === value)
        {
            if(confirm("Are you sure you want to Resolve this Query ?"))
            {
                Element.remove();
                responseContainer.innerHTML = "";
                localStorage.setItem(value,responseContainer.innerHTML);
                welcomeView.classList.remove("hidden");
                responseFormView.classList.add("hidden");
            }
        }
    });
});

responseSubmitButton.addEventListener('click',(event) =>
{
    if(responseName.value !== "" && responseComment.value !== "")
    {
        // Response ko store krne ke liye div element as like question div element
        const response = document.createElement("div");
        //response.className = "resAk"
        response.style.paddingTop = "7px";
        response.style.paddingLeft = "10px";
        
        const name = document.createElement("h4");
        name.classList.add("responseName1")

        // Here resp variable name is used for response which user will enter
        const resp = document.createElement("p");
        resp.classList.add("responseComment1");
        const hr = document.createElement("hr");

        // Name and Response me value copy
        name.textContent = responseName.value;
        resp.textContent = responseComment.value;

        // Response form ke input fields ki value blank krne ke liye
        responseName.value = "";
        responseComment.value = "";


        // Response element me name and resp (response) appendation
        response.appendChild(name);
        response.appendChild(resp);

        responseContainer.appendChild(response);
        responseContainer.appendChild(hr); 

        Responses.appendChild(responseContainer);

        var user = questionHeading.textContent + question.textContent;
            
        localStorage.setItem(user,responseContainer.innerHTML);
        event.preventDefault();
    } 
});

// Page refresh hone pr ya page close krne pr local storage clear krne ke liye

window.onabort
{
    localStorage.clear(); 
}