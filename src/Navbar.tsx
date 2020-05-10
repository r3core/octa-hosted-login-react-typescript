import React from 'react';
import { withOktaAuth, WithOktaAuthProps } from '@okta/okta-react';
import { RouteComponentProps } from 'react-router-dom';
import { Menu, Container, Image } from 'semantic-ui-react';

interface NavbarState {

}

interface NavbarProps extends RouteComponentProps<any>, WithOktaAuthProps {

}

export default withOktaAuth(class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
 
  async login() {
    this.props.authService.login('/');
  }
 
  async logout() {
    this.props.authService.logout('/');
  }
 
  render() {
    const { authState, } = this.props;
    return (
        <div>
          <Menu fixed="top" inverted>
            <Container>
              <Menu.Item as="a" header href="/">
                <Image size="mini" src="/react.svg" />
                &nbsp;
                Okta-React Sample Project
              </Menu.Item>
              {authState.isAuthenticated && <Menu.Item id="profile-button" as="a" href="/profile">Profile</Menu.Item>}
              {authState.isAuthenticated && <Menu.Item id="logout-button" as="a" onClick={this.logout}>Logout</Menu.Item>}
              {!authState.isPending && !authState.isAuthenticated && <Menu.Item as="a" onClick={this.login}>Login</Menu.Item>}
            </Container>
          </Menu>
        </div>
      );
  }
});