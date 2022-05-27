export {timeInTwoCharacter, setIcon}
function timeInTwoCharacter(time){
    let outputTime
    outputTime = ("0" + (time)).slice(-2)
    return outputTime
}
function setIcon(iconCode){
    if (iconCode === "01n"){
        return  "Moon"
    }
    if (iconCode === "01d"){
        return  "Sun"
    }
    if (iconCode === "04n" || iconCode === "03n" || iconCode === "02n"){
        return  "CloudsMoon"
    }
    if (iconCode === "04d" || iconCode === "03d" || iconCode === "02d"){
        return  "CloudsSun"
    }
    if (iconCode === "10n"){
        return  "RainMoon"
    }
    if (iconCode === "10d"){
        return  "RainSun"
    }
    if (iconCode === "13d" || iconCode === "13n"){
        return  "Snow"
    }
}