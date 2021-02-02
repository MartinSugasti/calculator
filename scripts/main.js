let expression = '0';
let lastChar = '0';
let display = document.querySelector('#display');

document.querySelector('#AC').addEventListener('click', resetExpression);
document.querySelector('#C').addEventListener('click', backExpression);
document.querySelectorAll('#expression-char').forEach(button => button.addEventListener('click', computeChar));
document.querySelector('#result').addEventListener('click', computeExpression);

function resetExpression() {
  expression = '0';
  lastChar = '0';
  display.textContent = '0';
}

function backExpression() {
  if (expression !== '0') {
    expression = expression.slice(0, -1);
    display.textContent = expression;
    lastChar = expression[expression.length - 1];
  }
}

function computeChar(e) {
  if (('+-^/*'.includes(lastChar) || expression === '0') && '+-^/*'.includes(e.target.textContent)) return;

  if (expression === '0') {
    expression = e.target.textContent;
  } else {
    expression += e.target.textContent;
  }
  lastChar = expression[expression.length - 1];
  display.textContent = expression;
}

function computeExpression() {
  if ('+-^/*'.includes(expression[expression.length - 1])) {
    expression = expression.splice(0, -1);
  }

  let terms = expression.split(/([-\+])/g);

  let partialResults = terms.map((term) => {
    if ('+-'.includes(term)) {
      return term;
    }

    return evaluateTerm(term);
  });

  let result = partialResults.reduce((previousValue, currentValue, index, array) => {
    if ('+'.includes(currentValue)) {
      return Number(previousValue) + Number(array[index + 1]);
    } else if ('-'.includes(currentValue)) {
      return previousValue - array[index + 1];
    } else {
      return previousValue;
    }
  })

  expression = result;
  display.textContent = expression;
}

function evaluateTerm(term) {
  let subTerms = term.split(/([*\/])/g);

  partialResults = subTerms.map(subTerm => {
    if (subTerm.includes('^')) {
      subSubTerms = subTerm.split('^');
      return subSubTerms.reduce((previousValue, currentValue) => previousValue ** currentValue)
    } else {
      return subTerm;
    }
  });

  let result = partialResults.reduce((previousValue, currentValue, index, array) => {
    if ('*'.includes(currentValue)) {
      return previousValue * array[index + 1];
    } else if ('/'.includes(currentValue)) {
      return previousValue / array[index + 1];
    } else {
      return previousValue;
    }
  })

  return result;
}
