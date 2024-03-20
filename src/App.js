// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [numberType, setNumberType] = useState('p'); 
//   const [windowSize, setWindowSize] = useState(10);
//   const [result, setResult] = useState('');

//   const calculateAverage = async () => {
//     try {
//       const response = await axios.get(`http://`);
//       const data = response.data;
//       if (response.status === 200) {
//         setResult(`Numbers: ${data.numbers.join(', ')} | Average: ${data.average}`);
//       } else {
//         setResult(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setResult('Error fetching data. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h1>Average Calculator Microservice</h1>
//       <div>
//         <label htmlFor="numberType">Select Number Type:</label>
//         <select id="numberType" value={numberType} onChange={(e) => setNumberType(e.target.value)}>
//           <option value="p">Prime Numbers</option>
//           <option value="f">Fibonacci Numbers</option>
//           <option value="e">Even Numbers</option>
//           <option value="r">Random Numbers</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="windowSize">Window Size:</label>
//         <input type="number" id="windowSize" value={windowSize} min="1" onChange={(e) => setWindowSize(e.target.value)} />
//       </div>
//       <button onClick={calculateAverage}>Calculate Average</button>
//       <div id="result">{result}</div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [res, setRes] = useState(null);

  const fetchData = async (numberid) => {
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberid}`);
      setRes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <button onClick={() => fetchData('p')}>
        Prime Numbers
      </button>
      <button onClick={() => fetchData('f')}>
         Fibonacci Numbers
         </button>
      <button onClick={() => fetchData('e')}>Even Numbers</button>
      <button onClick={() => fetchData('r')}> Random Numbers</button>
      {res && (
        <div>
          <h2>Prev Window State: {JSON.stringify(res.windowPrevState)}</h2>
          <h2>Curr Window State: {JSON.stringify(res.windowCurrState)}</h2>
          <h2>Nums: {JSON.stringify(res.numbers)}</h2>
          <h2>Average: {res.avg.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default App;