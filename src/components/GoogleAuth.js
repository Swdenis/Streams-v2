import React from 'react';

const _clientId = '765325676687-c4hr9f0kd1kdokv99iv2fsf5422gqpe9.apps.googleusercontent.com'
class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: _clientId,
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange)
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    switch(this.state.isSignedIn){
      case null:
        return null
      case true:
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

export default GoogleAuth;
