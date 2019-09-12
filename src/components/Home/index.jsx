import React from 'react';
import withCheckLogin from '../../containers/with-check-login/index'

@withCheckLogin
class Home extends React.Component{
    render() {
        return (
            <div>
                Home
            </div>
        );
    }

}
export default Home