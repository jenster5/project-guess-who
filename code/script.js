// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const winOrLose = document.getElementById("winOrLose")
const winOrLoseText = document.getElementById("winOrLoseText")
const filter =document.getElementById("filter") //find out button
const playAgain = document.getElementById("playAgain")
const boardWrapper = document.getElementById("boardWrapper")



// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]

// Global variables
let secret
let currentQuestion
let charactersInPlay

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ""
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class= "card">
      <p>${person.name}</p>
      <img src =${person.img} alt=${person.name}/>
        <div class = "guess">
          <span> Guess me ${person.name}?</span>
          <button class= "filled-button small">Guess</button>
        </div>
      </div>`
  })
}

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
  console.log(secret)
}

// This function to start (and restart) the game
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  //need secret to start
  setSecret()
  //need board to start
  generateBoard()
  
  boardWrapper.classList.remove("board-wrapper-inactive")
  winOrLose.classList.remove("win-or-lose-wrapper-active")

}

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  // This variable stores what option group (category) the question belongs to.
  const category = questions.options[questions.selectedIndex].parentNode.label
  //variable that stores the value of the question we've selected
  const value = questions.options[questions.selectedIndex].value
  
  currentQuestion = {
    category: category,
    value: value 
  }
}

// This function should be invoked when you click on 'Find Out=filter' button.
const checkQuestion = () => {
  console.log(currentQuestion)
  
  const {category, value} = currentQuestion
  


  if (category === 'hair' || category === 'eyes') {
  
    if (value === secret[category]) {

      filterCharacters(true)
    }
    else {

      filterCharacters(false)
    }
  }
  else if (category === 'accessories' || category === 'other') {
   
    if (secret[category].includes(value)) {
      filterCharacters(true)
    }
    else {
      filterCharacters(false)
    }
  }
}
console.log(currentQuestion)
// It'll filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  const { category, value } = currentQuestion
  // Show the correct alert message for different categories
  if (category === 'accessories') {
    if (keep) {
      alert(`Yes, the person wears ${value}! Keep all people that wear ${value}`)
      charactersInPlay = charactersInPlay.filter((person) =>person[category].includes(value))

    } else {
      alert(`No, the person doesn't wear ${value}! Remove all people that wear ${value}`)
      charactersInPlay = charactersInPlay.filter((person) =>!person[category].includes(value))
    }

  } else if (category === 'other') {

    if (keep) {
      alert(`Yes! The person does wear ${value}! Keep all the people that wear ${value}`)
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
    } else {
      alert(`Nope the person does not wear ${value}! Remove all the people that wear ${value}`)
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
    }
  }
 else if (category === 'eyes' || category === 'hair') {
  console.log('i am in the right category')
  if (keep) {
    // alert popup that says something like: "Yes, the person has yellow hair! Keep all people with yellow hair"
    alert(
      `Yes, the person has ${value} ${category}! Keep all people that have ${value} ${category}!`
    )
    charactersInPlay = charactersInPlay.filter((person) => person[category] === value)

  } else {
    // alert popup that says something like: "No, the person doesnt have yellow hair! Remove all people with yellow hair"
    alert(`No, the person doesn't have ${value} ${category}! Remove all people that have ${value} ${category}!`
    )
    charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)

  }}
  generateBoard();
}


// confirming the player would like to make a guess.
const guess = (personToConfirm) => {
  const userAnswer =confirm(`Do you want to guess ${personToConfirm}`)
  if (userAnswer==true){
    checkMyGuess(personToConfirm)
  }
  else{
    alert(`You can always guess again later`)
  }
}

// If you confirm, this function is invoked
const checkMyGuess = (personToCheck) => {
  let messgage =""
  if (secret.name ===personToCheck){
    message="Holy Moly you guessed correctly!"
  } else {
    messgage= "Woopsy daisy better luck next time"
  }

  winOrLose.innerHTML=message
  boardWrapper.classList.add("board-wrapper-inactive")
  winOrLose.classList.add("win-or-lose-wrapper-active")
  //Show the win or lose section and hide the game board
}

// Invokes the start function when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start)
questions.addEventListener("change", selectQuestion)
filter.addEventListener("click", checkQuestion)
playAgain.addEventListener("click", start)
