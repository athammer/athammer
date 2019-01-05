// Imports
import React from 'react';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
    }

    render() {
        return (<div className="home-render">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <main role="main" className="inner cover">
                    <h1 className="cover-heading">Welcome to Buy Pixels</h1>
                    <p className="lead">Your one stop shop for buying and selling limiteds and robux on a secure, fast, and easy market place!</p>
                    <p className="lead">
                        <a href="/market" className="btn btn-lg btn-secondary">Go to Market Place</a>
                    </p>
                    <hr/>
                    <h1 className="cover-heading">Want to start Buying and Selling?</h1>
                    <p className="lead">Start buying and selling limiteds and robux now with a by logging in or a short registration!</p>
                    <p className="lead">
                        <a href="/authentication" className="btn btn-lg btn-secondary">Get Access Now!</a>
                    </p>
                </main>
                <br/>
                <footer className="mastfoot mt-auto">

                </footer>
        </div>)
    }

}
Home.defaultProps = {
    name: 'riperoni pep boy'
};
export default Home;
