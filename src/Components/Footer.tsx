import styled from 'styled-components';
import {BsGithub} from "react-icons/bs"
const Wrapper = styled.div`
  width: 100vw;
  height: 5vh;
  background-color: ${(props) => props.theme.black.veryDark};
`;

const Copy = styled.span`
  text-align: center;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
`;
const Icon = styled.a`
  color:  white;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 50px;
  &:hover {
  }

  
`;



function Footer() {
  return (
    <Wrapper>
      
      <Icons>
      <Copy>© 2023 - Luke Heo, All rights reserved.</Copy>
        <Icon
          href="https://github.com/lukeheo8592"
          target="_blank"
          title="깃 허브"
        >
          <BsGithub  size="20"/>
        </Icon>
      </Icons>
    </Wrapper>
  );
}

export default Footer;
