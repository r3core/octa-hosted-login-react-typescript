import React from 'react';
import { withOktaAuth, WithOktaAuthProps, User } from '@okta/okta-react';
import { RouteComponentProps } from 'react-router-dom';
import { Header, Icon, Table } from 'semantic-ui-react';

interface ProfileState {
    userInfo: User | undefined;
}

interface ProfileProps extends RouteComponentProps<any>, WithOktaAuthProps {

}

export default withOktaAuth(class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
        userInfo: undefined
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount(){
    const userInfo = await this.props.authService.getUser();
    this.setState({userInfo})
  }
 
  async login() {
    await this.props.authService.login('/');
  }
 
  async logout() {
    await this.props.authService.logout('/');
  }
 
  render() {
    const { userInfo } = this.state;

    if (!userInfo) {
        return (
          <div>
            <p>Fetching user profile...</p>
          </div>
        );
      }
    
      return (
        <div>
          <div>
            <Header as="h1">
              <Icon />
              {' '}
              My User Profile (ID Token Claims)
              {' '}
            </Header>
            <p>
              Below is the information from your ID token which was obtained during the &nbsp;
              <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
              {' '}
              and is now stored in local storage.
            </p>
            <p>
              This route is protected with the
              <code>&lt;SecureRoute&gt;</code>
              {' '}
              component, which will ensure that this page cannot be accessed until you have authenticated.
            </p>
            <Table>
              <thead>
                <tr>
                  <th>Claim</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userInfo).map((claimEntry) => {
                  const claimName = claimEntry[0];
                  const claimValue = claimEntry[1];
                  const claimId = `claim-${claimName}`;
                  return (
                    <tr key={claimName}>
                      <td>{claimName}</td>
                      <td id={claimId}>{claimValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      );
  }
});