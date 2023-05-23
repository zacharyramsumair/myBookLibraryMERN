import React from 'react';
import LoginForm from '../../Components/Auth/LoginForm';
import BasePageDesign from '../BasePageDesign';

type Props = {};

const LoginPage: React.FC<Props> = (props) => {
  return (
 <BasePageDesign>
      <LoginForm />
 </BasePageDesign>
  );
};

export default LoginPage;
