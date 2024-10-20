let answerText = ''
let numberPermutations = ''

const submitBtnEl = document.getElementById('submitBtn')
submitBtnEl.addEventListener('click', function() {
  numberPermutations = ''
  const answerEl = document.getElementById('answer')
  answerEl.value = ''

  const inputNumberEl = document.getElementById('inputNumber')
  const inputNumber = inputNumberEl.value
  if(inputNumber.length > 5){
    alert("「数字」は5桁までやで")
    return
  }
  if(!/^\d+$/.test(inputNumber)){
    alert("「数字」に入力できるのは数字だけやで。空とか符号もダメや")
  }

  const answers = tenNisuru(inputNumber)
  const userAnswerNumEl = document.getElementById('userAnswerNum')
  userAnswerNumEl.value = answers.length

  answerText = answers.join('\n')

  const userAnswerEl = document.getElementById('userAnswer')
  const userAnswerResultEl = document.getElementById('userAnswerResult')
  if(!/^[\+\-\*\/\(\)\d]*$/.test(userAnswerEl.value)){
    alert("「お前の回答」に入力できるのは数式だけやで")
  }
  const userAnswerNumAry = Array.from(userAnswerEl.value).filter(f=>/\d/.test(f))
  if(numberPermutations.find(f=>f.join()===userAnswerNumAry.join())){
    if(new Function(`return ${userAnswerEl.value}`)() === 10){
      userAnswerResultEl.value = 'OK'
    }else{
      userAnswerResultEl.value = 'NG'
    }
  }else{
    userAnswerResultEl.value = 'NG'
  }

}, false);

const openBtnEl = document.getElementById('openBtn')
openBtnEl.addEventListener('click', function() {
  const answerEl = document.getElementById('answer')
  answerEl.value = answerText
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
                  let nextinputChoices = inputChoices.filter((f,fi)=>fi !== i)
                  let nextLocationChoices = locationChoices.filter((f,fi)=>fi !== j)
                  recursiveCalc(nextTarget, nextinputChoices, nextLocationChoices)
              }
              break
          }
      }
      recursiveCalc([], inputChoices, locationChoices)

      let strResultsAry = results.map(m=>m.join())
      let setStrResultsAry = Array.from(new Set(strResultsAry))
      results = setStrResultsAry.map(m=>m.split(','))
      return results
  }
  numberPermutations = generateNumberPermutations(inputNumber)
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
              ['+', '-'].forEach(op2=>{
                let addOp = op2
                if(addOp === '+'){
                  addOp = ''
                }
                const answer = addOp + calcAry.join('')
                if(new Function(`return ${answer}`)() === 10){
                  answers.push(answer)
                }
              })
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
