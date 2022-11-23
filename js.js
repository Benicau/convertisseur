//bouton reset
function effacer() {
        window.location.reload();
        document.getElementsByClassName("finalValue").innerHTML = "";
    };

var chiffre = document.querySelector("#recherche");
var convert = document.querySelector(".confirm");


function recu() {
    var input=document.getElementById("recherche").value
    var de=document.getElementById("monnaieOne").value
    var a=document.getElementById("monnaieTwo").value
    var result = document.querySelector('.resultat')
    var resultat
    if((input === '') ||(de === '') || (a === ''))
    {
        effacer()  
    } 
    for(var i=0; i<bitcoinRatio.length; i++)
    {
        var test = bitcoinRatio[i].deviseUn
        var test2 = bitcoinRatio[i].deviseDeux   
        if ((de === test) && (a ===test2))
        {
            resultat = bitcoinRatio[i].tauxConversion*input
            if(a==='BTC')
            {
                result.innerHTML = resultat
            }
            else
            {       
            resultat = resultat.toFixed(2)
            result.innerHTML = `<span>${input} ${test} = ${resultat} ${test2}</span>`  
            }    
        }
    }
    console.log(resultat)
}


//creation du tableau ratio avec toute les valleur calculer à partir du bitcoin
var bitcoinRatio = []
const monnaieOne = document.querySelector('#monnaieOne')
const monnaieTwo = document.querySelector('#monnaieTwo')
const first = document.querySelector('.first')
let btc = ''
fetch('https://blockchain.info/ticker')
    .then(function (response) {
        return response.json()
    })
    .then(function (reponse) {
        constructDatas(reponse)
    })
const constructDatas = datas => {
    for (key in datas) {
        var firstdevise = datas[key]['symbol']
        var valueFirstDevice = datas[key]['last']
        for (key in datas) {       
            var seconDevise = datas[key]['symbol']
            var valueSecondDevice = datas[key]['last']
            var conversion = valueSecondDevice / valueFirstDevice
            var info = {
                deviseUn: firstdevise,
                deviseDeux: seconDevise,
                tauxConversion: conversion
            }
            bitcoinRatio.push(info)
        }
        var valueMonnaieBtc = 1 / valueFirstDevice
        var btc = {
            deviseUn: firstdevise,
            deviseDeux: 'BTC',
            tauxConversion: valueMonnaieBtc
        }
        bitcoinRatio.push(btc)
    }
    for (key in datas) {
        var Unbtc = {
            deviseUn: 'BTC',
            deviseDeux: datas[key]['symbol'],
            tauxConversion: datas[key]['last']
        }
        bitcoinRatio.push(Unbtc)
        var symbol = datas[key]['symbol']
        const option = document.createElement('option')
        const optiontwo = document.createElement('option')
        option.setAttribute("value", symbol)
        optiontwo.setAttribute("value", symbol)
        option.innerHTML = symbol
        optiontwo.innerHTML = symbol
        monnaieOne.appendChild(option)
        monnaieTwo.appendChild(optiontwo)
    }
}
console.log(bitcoinRatio)
