'use client';
import { useState } from 'react';
import { 
  Input, 
  VStack, 
  FormControl, 
  Card, 
  CardHeader, 
  CardBody, 
  Heading, 
  UIProvider, 
  Button 
} from "@yamada-ui/react";

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelNameChange = (e) => {
    setName(e.target.value);
  };

  const handelEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handelPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      name,
      email,
      password
    };
    console.log(data);
  };
  
  return (
    <UIProvider>
      <Card>
        <CardHeader>
          <Heading>ログイン</Heading>
        </CardHeader>
        <CardBody>
          <VStack>
            <FormControl
              label="ニックネーム"
            >
              <Input 
                type="text" 
                placeholder="user name" 
                value={name}
                onChange={handelNameChange}
              />
            </FormControl>
            <FormControl
              label="メールアドレス"
            >
              <Input 
                type="email" 
                placeholder="email" 
                value={email}
                onChange={handelEmailChange}
              />
            </FormControl>
            <FormControl
              label="パスワード"
            >
              <Input 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={handelPasswordChange}
              />
            </FormControl>
            <Button onClick={handleSubmit}>ログイン</Button>
          </VStack>
        </CardBody>
      </Card>
    </UIProvider>
  );
}
