var elementsWithClass = document.getElementsByClassName('skeleton-loader');
var styleString = [];
for(var i = 0; i < elementsWithClass.length; i++){
  domElement = elementsWithClass[i];
  var width = domElement.getAttribute('data-width');
  var height = domElement.getAttribute('data-height');
  var whichLoader = domElement.getAttribute('data-loader');
  var style = window.getComputedStyle(domElement);
  var fontSize = style.getPropertyValue('font-size').split('px')[0];
  var lineHeight = style.getPropertyValue('line-height')
  var actualLineHeight;
  if(lineHeight === 'normal'){
    actualLineHeight = 1.5*fontSize;
  } else {
    actualLineHeight = lineHeight*fontSize;
  }
  generateCssStyle(width, height, whichLoader, fontSize, actualLineHeight);
}

function generateCssStyle(width, height, whichLoader, fontSize, actualLineHeight){
  var styleString = '';
  styleString+= '.skeleton-loader[data-loader="' + whichLoader + '"]:empty{'; //starting line with opening bracket
  styleString+= 'width:' + width + 'px;height:' + height + 'px;'; //width and height
  styleString+= 'background-repeat: repeat-y;';
  styleString+= 'background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% ),';
  var arrayOfLines = [];
  for(var i = 0; i < height/actualLineHeight; i++){
    arrayOfLines.push('linear-gradient(lightgray ' + 12  + 'px, transparent 0)');
  }
  
  styleString+= arrayOfLines.join(',');
  styleString+=';background-size:50px 100px,';
  arrayOfLines = [];
  for(var i = 0; i < height/actualLineHeight; i++){
    arrayOfLines.push((width - getRandomInt()) + 'px 200px');
  }
  styleString+= arrayOfLines.join(',');
  styleString+=';background-position:0 0,';
  arrayOfLines = [];
  for(var i = 0; i < height/actualLineHeight; i++){
    arrayOfLines.push('0px ' + (i*(actualLineHeight)) + 'px');
  }
  styleString+= arrayOfLines.join(',');
  styleString+=';animation: shine' + whichLoader + ' 1s infinite}';
  addStyleString(styleString);
  var animationString = '';
  animationString+= '@keyframes shine' + whichLoader + ' {to{background-position:100% 0,';
  animationString+= arrayOfLines.join(',');
  animationString+= ';}}';
  addStyleString(animationString);
}

function getRandomInt() {
  return Math.floor(Math.random() * (60 - 20)) + 20;
}

function addStyleString(str) {
  var node = document.createElement('style');
  node.innerHTML = str;
  document.body.appendChild(node);
}


