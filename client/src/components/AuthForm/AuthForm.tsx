import { FC, useState } from 'react';
import { LoginForm } from '../LoginForm';
import { RegistrationForm } from '../RegistrationForm';
import { SegmentedSwitch, SegmentedSwitchOption } from '../SegmentedSwitch';

type AuthType = 'login' | 'registration';

export const AuthForm: FC = () => {
  const [authType, setAuthType] = useState<AuthType>('login');

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-md mx-auto min-w-[305px] bg-blue-200 rounded-xl shadow-md flex items-center">
      <SegmentedSwitch>
        <SegmentedSwitchOption
          title="Sign In"
          isActive={authType === 'login'}
          onClick={() => setAuthType('login')}
        />
        <SegmentedSwitchOption
          title="Sign Up"
          isActive={authType === 'registration'}
          onClick={() => setAuthType('registration')}
        />
      </SegmentedSwitch>

      {authType == 'login' ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};
