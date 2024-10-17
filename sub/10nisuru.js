const submitBtnEl = document.getElementById('submitBtn')
submitBtnEl.addEventListener('click', function() {
  const inputNumberEl = document.getElementById('inputNumber')
  const inputNumber = inputNumberEl.value
  const answers = tenNisuru(inputNumber)
  const userAnswerNumEl = document.getElementById('userAnswerNum')
  userAnswerNumEl.value = answers.length
  const answerEl = document.getElementById('answer')
  answerEl.value = answers.join('\n')
}, false);

function tenNisuru(inputNumber){
  console.log('start')
  function generateNumberPermutations(input){
      let inputChoices = input.toString().split('').map(x=>Number(x))
      let locationChoices = new Array(inputChoices.length).fill(0).map((x, i)=>i)
      let results = []
      function recursiveCalc(target, inputChoices, locationChoices){
          if(locationChoices.length <= 0){
              results.push(target)
          }
          for(let i=0; i < inputChoices.length; i++){
              let num = inputChoices[i]
              for(let j=0; j < locationChoices.length; j++){
                  let location = locationChoices[j]
                  let nextTarget = target.concat()
                  nextTarget[location] = num
                  let nextinputChoices = inputChoices.filter(f=>f !== num)
                  let nextLocationChoices = locationChoices.filter(f=>f !== location)
                  recursiveCalc(nextTarget, nextinputChoices, nextLocationChoices)
              }
              break
          }
      }
      recursiveCalc([], inputChoices, locationChoices)
      return results
  }
  let numberPermutations = generateNumberPermutations(inputNumber)
  console.log('-----------------------')
  console.log(numberPermutations)
  
  function generateOperatorsPermutations(resultLength){
      const operators = ['+', '-', '*', '/']
      let results = []
      function recursiveCalc(operatorAry){
          if(operatorAry.length >= resultLength){
              results.push(operatorAry)
              return
          }
          for(let i=0; i < operators.length; i++){
              let operator = operators[i]
              let nextOperatorAry = operatorAry.concat()
              nextOperatorAry.push(operator)
              recursiveCalc(nextOperatorAry)
          }
      }
      recursiveCalc([])
      return results
  }
  const operatorsPermutations = generateOperatorsPermutations(numberPermutations[0].length - 1)
  console.log('-----------------------')
  console.log(operatorsPermutations)
  console.log('-----------------------')
  
  function getAnswers(numberPermutations, operatorsPermutations){
      let answers = []
      numberPermutations.forEach(np=>{
          operatorsPermutations.forEach(op=>{
              let calcAry = []
              for(let i=0; i<np.length + op.length; i++){
                  if(i%2 === 0){
                      calcAry.push(np[i/2])
                  }else{
                      calcAry.push(op[parseInt(i/2)])
                  }
              }
              if(eval(calcAry.join('')) === 10){
                  answers.push(calcAry.join(''))
              }
          })
      })
      
      return answers
  }
  
  const answers = getAnswers(numberPermutations, operatorsPermutations)
  
  console.log('-----------------------')
  console.log('answers')
  console.log(answers)
  console.log('end')
  return answers
}
