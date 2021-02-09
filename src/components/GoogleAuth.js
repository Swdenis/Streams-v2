import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

const _clientId = '765325676687-c4hr9f0kd1kdokv99iv2fsf5422gqpe9.apps.googleusercontent.com'
class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: _clientId,
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange)
        });
    });
  }

  onAuthChange = (isSignedIn) => {
      if(isSignedIn) {
        this.props.signIn()
      } else {
        this.props.signOut()
      }
    }

  onSignInClick = () => {
    this.auth.signIn(this.auth.currentUser.get().getId());
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    switch(this.props.isSignedIn){
      case null:
        return null
      case  true:
        return(
        <button className="ui red google button"
        onClick={this.onSignOutClick}>
          <i className="google icon"></i>Sign out
        </button>)
      default:
        return(
          <button className="ui red google button"
          onClick={this.onSignInClick}>
            <i className="google icon"></i>Sign in with Google
          </button>)
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return(
    {
      isSignedIn: state.auth.isSignedIn
    }
  )
  }

export default connect(mapStateToProps,{signIn,signOut })(GoogleAuth);
