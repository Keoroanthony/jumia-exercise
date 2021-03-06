import { useState, useEffect } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Service from './httpservices/Service';


function App() {

  const [countries, setCountries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [countrySelectedOption, setCountrySelectedOption] = useState('')
  const [stateSelectedOption, setStateSelectedOption] = useState('')

  const getCountries = () =>{
    Service.getCountries()
      .then((res) =>{
        setCountries(res.data);
      })
      .catch((err) => console.log(err));
  }


  const getUsers = () =>{
    Service.getCustomers()
        .then((res) => {
          setCustomers(res.data);
        })
        .catch((err) => console.log(err))
  }


  const handleStateSelect = (e) =>{
    setStateSelectedOption(e.target.value);    
  }


  const handleCountrySelect = (e) =>{
    setCountrySelectedOption(e.target.value);
  }

  const getCustomersByCountry = (countrySelectedOption) =>{
    Service.getCustomersByCountry(countrySelectedOption)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }


  const getCustomersByValidity = (stateSelectedOption) =>{
    Service.getCustomersWithValidity(stateSelectedOption)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }

 const getCustomersByCountryAndValidity = (countrySelectedOption, stateSelectedOption) =>{
   Service.getCustomersByCountryAndValidity(countrySelectedOption, stateSelectedOption)
    .then(res => setCustomers(res.data))
    .catch(err => console.log(err));
 }

  const getUsersFilter = () =>{

    if (!countrySelectedOption && !stateSelectedOption) {
      
        getUsers();
    
    } else if (countrySelectedOption && !stateSelectedOption) {
     
      getCustomersByCountry(countrySelectedOption);
    
    } else if (stateSelectedOption && !countrySelectedOption) {
      
      getCustomersByValidity(stateSelectedOption);
    
    } else getCustomersByCountryAndValidity(countrySelectedOption, stateSelectedOption);
  }

  const resetFilter = () =>{
    window.location.reload(true)
  }

  useEffect(() => {

    getCountries();
    getUsersFilter();

  }, [countrySelectedOption, stateSelectedOption])
  

  return (
    <div className="App">
     

      <Container>

      <h1 className='text-center my-5'>Countries and Phone Numbers</h1>

      <h5>Filter By:</h5>
      <div className='row'>

        <div className='col-lg-3'>
          <label>Country</label>
          <select className='form-select my-4 bg-dark text-white col-lg-6' onChange={handleCountrySelect}>
            <option value={''}>Select Country</option>
            { countries.map((country, index) => (
              <option key={index} value={country.countryPrefix}>{country.countryName}</option>
            ))}
          </select>
        </div>


        <div className='col-lg-3'>
        <label>State</label>
          <select className='form-select my-4 bg-dark text-white col-lg-6' onChange={handleStateSelect}>
            <option value={''}>Select State</option>
            <option value={"valid"}>Valid</option>
            <option value={"invalid"}>Invalid</option>
          </select>
        </div>

        <div className='col-lg-6 d-flex justify-content-end align-items-center'>
            <button className='btn btn-primary' onClick={resetFilter}>RESET</button>
        </div>

      </div>
      
          <Table responsive striped bordered hover variant="dark" className='my-4'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Country Code</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              { customers.map((customer) =>(
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.country}</td>
                  <td>{customer.countryCode}</td>
                  <td>{customer.state}</td>
                </tr>
              ))}

            </tbody>
        </Table>

      </Container>



    </div>
  );
}

export default App;
