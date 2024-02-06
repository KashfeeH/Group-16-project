/* function sayHello() {
    const outputElement = document.getElementById('output');
    outputElement.textContent = 'Hello, World!';
  } */
  /* var songTitle = "Lady in Red";
  function sayHello() {
    const buttonElement = document.getElementById('changingButton');
    buttonElement.textContent = songTitle;
  }
  */

  // add fetch command to pull down the song title from youtube
  // add the songTitle variable
  // create the buttons
 /* var button1 = {
    title: "Button 1",
  };
  var button2 = {
    title: "Button 2",
  };
  var button3 = {
    title: "Button 3",
  };
  var button4 = {
    title: "Button 4",
  };
  var button5 = {
    title: "Button 5",
  }; */

  var button1 = "Song 1";
  var button2 = "Song 2";
  var button3 = "Song 3";
  var button4 = "Song 4";
  var button5 = "Song 5";

  var buttonList = [button1, button2, button3, button4, button5];

  buttonList = JSON.parse(localStorage.getItem('localstorebuttonList')) || []

  //add code to move the data incrementally up 5 discard, 4 to 5, 3 to 4, 2,to 3, 1 to 2, replace 1 with downloaded current title 

  //add the current list to this list

  buttonList.push[button1, button2, button3, button4, button5];

  // pass it back to local storage

  localStorage.setItem('localstorebuttonList', JSON.stringify(buttonList));
  //show it has been completed by logging to the console.log message
  console.log('buttons stored ', button1, button2, button3, button4, button5);

  // create buttons from the stored variables
  //createButtons() {
    var buttonContainer = document.getElementById('buttonContainer');
  /*  buttonList.forEach(function(title) {
        var button = document.createElement('button');
        button.textContent = title;
        buttonContainer.appendChild(button);
    }) */
    for (var i = 0; i < buttonList.length; i++) {
        var button = document.createElement('button');
        button.textContent = buttonList[i];
        buttonContainer.appendChild(button);
      }

        
    ;//);
  //}


  // once confirmed working integrate the songTitle fetch into the video fetch command and update the songTitle variable update 
  // update the songTitle variable to the button name object held in local storage

  // nice to have, may be update the buttons to hold a 10% * 10% or 5% * 5%, of the screen, size thumbnail of the image pulled down by the fetch rather than the song title

