//Task_1
function printPowsOf2(number) {
    if (typeof number !== 'number') {
        console.log('incorrect type');
        return;
    }
    for (let i = 1; i <= number; i *= 2) {
        console.log(i);
    }
}

printPowsOf2("302");
printPowsOf2(null);
printPowsOf2(128);
printPowsOf2(60);
//Task_2
function calculateSumOfArray() {
    const initialArray = [3, 2, "2", null, 1.5, 9.5, undefined];
    let sum = 0;
    for (let i = 0; i < initialArray.length; i++) {
        if (typeof initialArray[i] === 'number') {
            sum += initialArray[i];
        }
    }
    console.log(sum);
}

calculateSumOfArray();
//Task_3
function printSeasonByMonth(month) {
    const seasons = {
        "DECEMBER": "winter",
        "JANUARY": "winter",
        "FEBRUARY": "winter",
        "MARCH": "spring",
        "APRIL": "spring",
        "MAY": "spring",
        "JUNE": "summer",
        "JULY": "summer",
        "AUGUST": "summer",
        "SEPTEMBER": "autumn",
        "OCTOBER": "autumn",
        "NOVEMBER": "autumn"
    };
    console.log(seasons[month.toUpperCase()]);
}

printSeasonByMonth("SEPTEMBER");
printSeasonByMonth("NOVEMBER");
printSeasonByMonth("JULY");
printSeasonByMonth("APRIL");
//Task_4
function calculateWordsInString(string) {
    const words = string.trim().split(/\s+/);
    console.log(words.length);
}

calculateWordsInString("Easy string for count");
calculateWordsInString("Easy");
calculateWordsInString("Some string with a triple   space");
calculateWordsInString("Some?  string, with a triple   space");
