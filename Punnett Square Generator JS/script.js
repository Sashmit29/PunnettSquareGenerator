function allCombinations(strings) {
  var combinations = [];

  for (var i = 0; i < strings.length; i++) {
    var string = strings[i];

    if (combinations.length === 0) {
      for (var char1 = 0; char1 < string.length; char1++) {
        combinations.push(string[char1]);
      }
    } else {
      var tempCombinations = [];

      for (var j = 0; j < combinations.length; j++) {
        var combination = combinations[j];
        for (var char = 0; char < string.length; char++) {
          tempCombinations.push(combination + string[char]);
        }
      }

      combinations = tempCombinations;
    }
  }

  return combinations;
}

function orderAlleles(alleles) {
  var returnString = "";
   for (var a = 0; a < alleles[0].length; a++) {
     if (alleles[0][a].toLowerCase() == alleles[0][a]) {
       returnString += (alleles[1][a] + alleles[0][a]);
     } else {
       returnString += (alleles[0][a] + alleles[1][a]);
     }
   }
  return returnString;
}

function addToProbability(dominant, gene) {
  if (gene[0].toUpperCase() == gene[0]) {
    if (dominant) {
      return true;
    } else {
      return false;
    }
  } else {
    if (dominant) {
      return false;
    } else {
      return true;
    }
  }
}

var punnettSquare = document.createElement("table");
var created = false;

window.onload = function() {
  var genotype1Element = document.getElementById("genotype1");
  var genotype2Element = document.getElementById("genotype2");
  var submit = document.getElementById("submit");
  var body = document.getElementById("body");
  submit.onclick = function() {
    var genotype1 = genotype1Element.value;
    var genotype2 = genotype2Element.value;
    var genotype1Genes = [];
    var genotype2Genes = [];
    var currentGene = "";
    var currentGene2 = "";
    var tableData = [];
    if (created) {
      punnettSquare = document.createElement("table");
    }
    
    var divisionElement = document.createElement("div");
    body.appendChild(divisionElement);
    divisionElement = document.createElement("h3");
    divisionElement.innerHTML = genotype1 + " x " + genotype2;
    body.appendChild(divisionElement);
    divisionElement = document.createElement("div");
    body.appendChild(divisionElement);
    
    for (var k = 0; k < genotype1.length; k++) {
      currentGene += genotype1[k];
      currentGene2 += genotype2[k];
      if (k % 2 == 1) {
        genotype1Genes.push(currentGene);
        genotype2Genes.push(currentGene2);
        currentGene = "";
        currentGene2 = "";
      }
    } 
    var firstRow = allCombinations(genotype1Genes);
    var firstColumn = allCombinations(genotype2Genes);
    var firstRowObj = document.createElement("tr");
    var tempEntry;
    firstRowObj.appendChild(document.createElement("td"));
    for (var l = 0; l < firstRow.length; l++) {
      tempEntry = document.createElement("td");
      tempEntry.innerHTML = firstRow[l];
      firstRowObj.appendChild(tempEntry);
    }
    var nextRow;
    var rowData;
    punnettSquare.appendChild(firstRowObj);
    for (var m = 0; m < firstColumn.length; m++) {
      nextRow = document.createElement("tr");
      rowData = document.createElement("td");
      rowData.innerHTML = firstColumn[m];
      nextRow.appendChild(rowData);
      tableData.push([]);
      for (var n = 0; n < firstRow.length; n++) {
        rowData = document.createElement("td");
        rowData.innerHTML = orderAlleles([firstRow[n], firstColumn[m]]);
        tableData[m].push(orderAlleles([firstRow[n], firstColumn[m]]));
        nextRow.appendChild(rowData);
      }
      punnettSquare.appendChild(nextRow);
    }
    body.appendChild(punnettSquare);
    created = true;
    
    var inputText = document.createElement("p");
    inputText.innerHTML = "Please enter the allele of each trait that you want to find the phenotypic probability for."
    body.appendChild(inputText);
    var probabilityInputArr = [];
    var traitNameArr = [];
    for (var b = 0; b < firstRow[0].length; b++) {
      var probabilityInput = document.createElement("input");
      probabilityInput.placeholder = "Trait " + firstRow[0][b].toUpperCase() + " (Dominant/Recessive)";
      traitNameArr.push("Trait " + firstRow[0][b].toUpperCase());
      probabilityInputArr.push(probabilityInput);
      body.appendChild(probabilityInput);
      inputText = document.createElement("div");
      body.appendChild(inputText);
    }
    inputText = document.createElement("button");
    inputText.innerHTML = "Find Probability";
    body.appendChild(inputText);
    
    inputText.onclick = function() {
      var dominantArr = [];
      for (var e = 0; e < probabilityInputArr.length; e++) {
        dominantArr.push((probabilityInputArr[e].value == "Dominant"));
      }
      
      var probabilityText = document.createElement("p");
      var probabilityArr = [];
      for (var g = 0; g < dominantArr.length; g++) {
        probabilityArr.push(0);
      }
      
      for (var c = 0; c < firstColumn.length; c++) {
        for (var d = 0; d < firstRow.length; d++) {
          for (var f = 0; f < dominantArr.length; f++) {
            var checkGene = tableData[c][d][(2*f)] + tableData[c][d][((2*f)+1)];
            if (addToProbability(dominantArr[f], checkGene)) {
              probabilityArr[f] = probabilityArr[f] + 1; 
            }
          }
        } 
      }
      
      var probability = 1;
      var totalPossibilities = firstColumn.length * firstColumn.length;
      for (var h = 0; h < probabilityArr.length; h++) {
        probability *= (probabilityArr[h]/totalPossibilities);
      }
      
      var dominantStrArr = [];
      for (var o = 0; o < dominantArr.length; o++) {
        if (dominantArr[o]) {
          dominantStrArr.push("dominant");
        } else {
          dominantStrArr.push("recessive");
        }
      }
      
      var probabilityStr = "The probability of ";
      for (var p = 0; p < traitNameArr.length; p++) {
        if (traitNameArr.length >= 3) {
          if (p == traitNameArr.length - 1) {
            probabilityStr += "and the " + dominantStrArr[p] + " allele of " + traitNameArr[p];
          } else {
            probabilityStr += "the " + dominantStrArr[p] + " allele of " + traitNameArr[p] + ", ";
          }
        } else if (traitNameArr.length == 2) {
          if (p == traitNameArr.length - 1) {
            probabilityStr += " and the " + dominantStrArr[p] + " allele of " + traitNameArr[p];
          } else {
            probabilityStr += "the " + dominantStrArr[p] + " allele of " + traitNameArr[p];
          }
        } else {
          probabilityStr += " the " + dominantStrArr[p] + " allele of " + traitNameArr[p];
        }
      }
      var probabilityNum = probability * totalPossibilities;
      probabilityStr += " being expressed is " + (probability*100) + "% as a percentage, and " + probabilityNum + "/" + totalPossibilities + " as a fraction.";
      probabilityText.innerHTML = probabilityStr;
      body.appendChild(probabilityText);
    }
  }
}
