
function timeConversion(s) {
    // Write your code here
    let hour = Number(s[0] + s[1]);
    switch(s[8]) {
        case 'P':
            if (hour == 12) return s.substring(0, 8);
            else return String((Number(s.substring(0, 2))) + 12).padStart(2, '0') + s.substring(2, 8);
        case 'A':
            if (hour == 12) return String((Number(s.substring(0, 2))) - 12).padStart(2, '0') + s.substring(2, 8);
            else return s.substring(0, 8);
    }
} 


async function apiCheck(apiLink) {

    try {
        let myRequest = await fetch(apiLink)
        let requestObj = await myRequest.json()
            // Iterate over the properties of the object using for...in
            const tableData = [];
            for (const property in requestObj) {
                if (requestObj.hasOwnProperty(property)) {
                    const rowData = {
                        Property: property,
                        Value: requestObj[property],
                    };
                    tableData.push(rowData);
                }
            }
            // Shortening Array Length

            tableData.length = 10;
            
            
            console.log("\n")
            
            console.log(`The UserName ==> ${tableData[0].Value}`)
            
            console.log("\n")
            
            console.table(tableData);
            
            console.log("\n")
    } catch (err) {
        console.log(Error("Api Not Found"));
    } finally {
        console.log("Operation Completed")
    }


}

// PrimeNumbers

function isPrime(number) {
    let start = 2;
    const limit = Math.sqrt(number);
    while (start <= limit) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}; 
function primeNumbers(num) {
	let finalArr = [];
		for (let i = 1;i < num; i++ ) {
            isPrime(i) ? finalArr.unshift(i) : finalArr.unshift(); 
		}
		return finalArr.length;
}