var indexOfWord = 0;
var userInput = "";
var userReplaceInput = "";
//LAURENT SHALA

// function that gets the file the user uploaded and displays the contents
// of the file to the textarea
function getData() {
    var fileInput = document.querySelector('input[id=fileInput]').files[0];
    var fileDisplayArea = document.querySelector('textarea[id=textarea]');
    if (fileInput) {
        // checks to see if the user uploaded a file
        var reader = new FileReader();
        reader.readAsText(fileInput, "UTF-8");
        reader.onload = function (event) {
            text = event.target.result;
            fileDisplayArea.value = text;
        };
    } else {
        // displays an error message if something went wrong
        fileDisplayArea.value = "There was some sort of error, please try again";
    }
}


// function that grabs what the user wishs to find and highlights the
// current instance the found word
function search() {
    userInput = document.querySelector('input[id=findBar]').value;
    var fileDisplayArea = document.querySelector('textarea[id=textarea]');
    var text = fileDisplayArea.value;
    // var regex = new RegExp(createRegExs(userInput),"i");
    if (userInput === "") {
        //checks if the user put something in the textbox
        alert("Plese enter a string that you would like to search for");
    } else if (text === "") {
        //checks if the user uploaded a file
        alert("Please load a file you would like to search through");
    }

    else {
        var strArr = createRegExs(userInput);
        for (var i = 0; i < strArr.length; i++) {
            var regex = new RegExp(strArr[i], 'i');
            if (regex.test(text) === true) {
                userInput = strArr[i];
                break;
            }
        }
        if (text.indexOf(userInput, indexOfWord) === -1) {
            // sets indexOfWord back to 0 after going out-of-bounds
            indexOfWord = 0;
        }
        indexOfWord = text.indexOf(userInput, indexOfWord);
        fileDisplayArea.focus();
        fileDisplayArea.setSelectionRange(indexOfWord, indexOfWord + userInput.length);
        indexOfWord++;
    }
}


// function that grabs what user wishs to replace (replace String) and
// then cuts the original word and replaces it with replacement word
function replace() {
    userReplaceInput = document.querySelector('input[id=replaceBar]').value;
    var fileDisplayArea = document.querySelector('textarea[id=textarea]');
    var text = fileDisplayArea.value;
    if (userReplaceInput === "") {
        //checks if the user put something in the textbox
        alert("Plese enter a replace string");
    } else if (text === "") {
        //checks if the user uploaded a file
        alert("Please load a file you would like to search through");
    } else {
        //if user uploaded a file && entered a string
        var textBefore = text.substring(0, indexOfWord - 1);
        var textAfter = text.substring(indexOfWord - 1, text.length);
        fileDisplayArea.focus();
        fileDisplayArea.value = textBefore + textAfter.replace(new RegExp(userInput, "i"), userReplaceInput);
        indexOfWord = 0;
    }
}


function createRegExs(input) {
    var myArray = new Array();
    myArray.push(input);
    firstIndex = 0;
    secondIndex = 1;
    
    //FIXME I chould try to merge these two while loops..
    while (secondIndex != input.length) {
        var char1 = input.charAt(firstIndex);
        var char2 = input.charAt(secondIndex);
        var leftHalf = input.substring(0, firstIndex);
        var rightHalf = input.substring(secondIndex + 1, input.length);
        firstIndex++;
        secondIndex++;
        myArray.push(leftHalf + char2 + char1 + rightHalf);
    }
    var firstIndex = 0;
    var secondIndex = 1;
    while (secondIndex != input.length + 1) {
        var leftHalf = input.substring(0, firstIndex);
        var rightHalf = input.substring(secondIndex, input.length);
        firstIndex++;
        secondIndex++;
        myArray.push(leftHalf + rightHalf);
    }
    return myArray;
}


