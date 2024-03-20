// const http = require('http');

// const PORT = 9876;

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Server is running on port 9876\n');
// });

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9876;
const WINDOW_SIZE = 10;
let numbers = [];
let windowPrevState = [];
let windowCurrState = [];

const fetchNumbers = async (type) => {
    let url;
    switch (type) {
        case 'p':
            url = 'http://20.244.56.144/numbers/primes';
            break;
        case 'f':
            url = 'http://20.244.56.144/numbers/fibo';
            break;
        case 'e':
            url = 'http://20.244.56.144/numbers/even';
            break;
        case 'r':
            url = 'http://20.244.56.144/numbers/rand';
            break;
        default:
            url = '';
            break;
    }
    try {
        const response = await axios.get(url);
        const responseData = response.data.numbers;
        console.log(`Received data for type '${type}':`, responseData);
        if (!Array.isArray(responseData)) {
            console.error(`Response data for type '${type}' is not an array:`, responseData);
            return [];
        }
        return responseData;
    } catch (error) {
        console.error(`Error fetching data for type '${type}':`, error);
      
        return [];
    }
};

const calculateAverage = () => {
    if (numbers.length === 0) {
        return 0;
    }
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
};

const updateNumbers = (newNumber) => {
    if (numbers.length >= WINDOW_SIZE) {
        windowPrevState = numbers.slice(0, WINDOW_SIZE);
        numbers.shift();
    }
    numbers.push(newNumber);
    windowCurrState = numbers.slice(-WINDOW_SIZE);
};

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
        return res.status(400).json({ error: 'Invalid numberid' });
    }

    const newNumbers = await fetchNumbers(numberid);
    newNumbers.forEach((num) => updateNumbers(num));

    const avg = calculateAverage();
    const response = {
        windowPrevState,
        windowCurrState,
        numbers,
        avg,
    };
    res.json(response);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// const express = require('express');
// const axios = require('axios');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 9877;
// const WINDOW_SIZE = 10;
// let numbers = [];
// let windowPrevState = [];
// let windowCurrState = [];

// const fetchNumbers = async (type) => {
//     let url;
//     switch (type) {
//         case 'p':
//             url = 'http://20.244.56.144/numbers/primes';
//             break;
//         case 'f':
//             url = 'http://20.244.56.144/numbers/fibo';
//             break;
//         case 'e':
//             url = 'http://20.244.56.144/numbers/even';
//             break;
//         case 'r':
//             url = 'http://20.244.56.144/numbers/rand';
//             break;
//         default:
//             url = '';
//             break;
//     }
//     try {
//         const response = await axios.get(url);
//         const responseData = response.data.numbers;
//         console.log(`Received data for type '${type}':`, responseData);
//         if (!Array.isArray(responseData)) {
//             console.error(`Response data for type '${type}' is not an array:`, responseData);
//             return [];
//         }
//         return responseData;
//     } catch (error) {
//         console.error(`Error fetching data for type '${type}':`, error);
//         return [];
//     }
// };

// const calculateAverage = () => {
//     if (numbers.length === 0) {
//         return 0;
//     }
//     const sum = numbers.reduce((acc, curr) => acc + curr, 0);
//     return sum / numbers.length;
// };

// const updateNumbers = (newNumber) => {
//     if (numbers.length >= WINDOW_SIZE) {
//         windowPrevState = numbers.slice(0, WINDOW_SIZE);
//         numbers.shift();
//     }
//     numbers.push(newNumber);
//     windowCurrState = numbers.slice(-WINDOW_SIZE);
// };

// app.get('/numbers/:numberid', async (req, res) => {
//     const { numberid } = req.params;
//     if (!['p', 'f', 'e', 'r'].includes(numberid)) {
//         return res.status(400).json({ error: 'Invalid numberid' });
//     }

//     const newNumbers = await fetchNumbers(numberid);
//     newNumbers.forEach((num) => updateNumbers(num));

//     const avg = calculateAverage();
//     const response = {
//         windowPrevState,
//         windowCurrState,
//         numbers,
//         avg,
//     };

//     if (numberid === 'e') {
//         response.evenNumbers = newNumbers.filter((num) => num % 2 === 0);
//     }

//     res.json(response);
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
