import React from "react";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isloading: true, items: [], country: "" };
    this.handlechange=this.handlechange.bind(this);
    this.handlesubmit=this.handlesubmit.bind(this);
  }

   async getData(country) {
    console.log(country);
    let coronadata = await fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "429e25e66fmsh61927d98fae25adp1e283fjsn91e660eadb7a"
      }
    }).then(response=>response.json()).then(data=>data);
    this.setState({ isloading: false, items: coronadata });
  }

  componentDidMount() {
    this.getData();
  }

  PrintResults(props) {
    return <div>{props.name}</div>;
  }

  handlechange(event){
    this.setState({country: event.target.value});
  }

  handlesubmit(event){
    let country = this.state.country;
    this.getData(country);
    console.log(country);
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    var { isloading, items } = this.state;
    if (isloading === true) {
      return <div>loading...</div>;
    } else {
      console.log(items);
      const Data = items.data;
      console.log(Data);

      return (
        <div>
          <h1>{Data.location}</h1>
          <form onSubmit={this.handlesubmit}>
            <input
              type="text"
              placeholder="Enter Country Here"
              value={this.state.country}
              onChange={this.handlechange}
            ></input>
          </form>
          <h3 style={{ fontWeight: "normal" }}>
            <ul>
              {Object.keys(Data).map((result, i) => {
                return (
                  <li key={i}>
                    {result}: {Data[result]}
                  </li>
                );
              })}
            </ul>
          </h3>
        </div>
      );
    }
  }
}

export default App;
