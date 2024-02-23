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
      <Card className="max-w-md mx-auto mt-10 overflow-hidden">
        <CardHeader bgGradient="linear(to-l, #7928CA, #FF0080)" className="bg-blue-500 px-5 py-4">
          <Heading className="text-white">ログイン</Heading>
        </CardHeader>
        <CardBody className="p-6">
          <VStack>
            <FormControl
              label="ニックネーム"
            >
              <Input 
                className="shadow"
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
                className="shadow"
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
                className="shadow"
                type="password" 
                placeholder="password" 
                value={password}
                onChange={handelPasswordChange}
              />
            </FormControl>
            <Button 
              onClick={handleSubmit}
              colorScheme='primary'
            >ログイン</Button>
          </VStack>
        </CardBody>
      </Card>
    </UIProvider>
  );
}
