import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import logo from '../../assets/logoblack.png';

function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Doações" width="32px" height="24px" />
          <Link to="/dashboard">HOME</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Perfil</Link>
            </div>
            <img src={!!(profile.avatar)?profile.avatar.url:"https://api.adorable.io/avatars/57/abott@adorable.png"} alt="Matheus Schenatto"/>
          </Profile>
        </aside>

      </Content>
    </Container>
  );
}

export default Header;